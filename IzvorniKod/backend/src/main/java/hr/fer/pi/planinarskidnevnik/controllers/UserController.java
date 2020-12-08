package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.dtos.UserCreateDto;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.services.impl.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.security.Principal;

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

    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody final UserCreateDto dto) {
        LOGGER.info("User creating");
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(dto));
    }

    @GetMapping(value = "/image", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getCurrentUserImage(Principal principal) {
        return ResponseEntity.ok(userService.getImage(principal.getName()));
    }

    @RequestMapping(value = "{id}",method=RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@PathVariable("id") final Long userId, Principal principal) {
        LOGGER.info("User removing");
        userService.deleteUser(userId, principal);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/current")
    public ResponseEntity<UserCreateDto> editCurrentUser(@RequestBody UserCreateDto userCreateDto) {
        LOGGER.info("Current user editing");
        final User user = userService.editCurrentUser(userCreateDto);
        return ResponseEntity.ok(new UserCreateDto(user.getUsername(), user.getPassword(), user.getEmail(), user.getFullName()));
    }
}
