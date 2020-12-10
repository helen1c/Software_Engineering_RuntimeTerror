package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.dtos.UserCreateDto;
import hr.fer.pi.planinarskidnevnik.dtos.UserSearchDto;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.services.impl.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") final Long userId) {
        LOGGER.info("User fetching");
        final User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/community")
    public ResponseEntity<?> getUserByName(@RequestParam("name") final String userName) {
        LOGGER.info("User fetching by name");
        final List<UserSearchDto> list = userService.getUserByName(userName);
        return ResponseEntity.ok(list);
    }

    @GetMapping("role/{id}")
    public ResponseEntity<?> getUserRoleById(@PathVariable("id") final Long userId) {
        LOGGER.info("User fetching");
        final User user = userService.getUserById(userId);
        return ResponseEntity.ok(userService.getRole(user.getEmail()));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Principal principal) {
        LOGGER.info("Getting current user");
        final User user = userService.checkForEmail(principal.getName());
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody final UserCreateDto dto) {
        LOGGER.info("User creating");
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(dto));
    }

    @GetMapping(value = "/image", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getCurrentUserImage(Principal principal) {
        return ResponseEntity.ok(userService.getImage(principal.getName()));
    }

    @GetMapping(value = "/image/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImageById(@PathVariable("id") final Long id) {
        return ResponseEntity.ok(userService.getImage(userService.getUserById(id).getEmail()));
    }

    @RequestMapping(value = "{id}",method=RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@PathVariable("id") final Long userId, Principal principal) {
        LOGGER.info("User removing");
        userService.deleteUser(userId, principal);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/current")
    public ResponseEntity<UserCreateDto> editCurrentUser(@RequestBody UserCreateDto userCreateDto, Principal principal) {
        LOGGER.info("Current user editing");
        final User user = userService.editCurrentUser(userCreateDto, principal);
        return ResponseEntity.ok(new UserCreateDto(user.getName(), user.getPassword(), user.getEmail(), user.getPlaceOfResidence(), user.getDateOfBirth(), user.getDescription(), null));
    }
}
