package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.dtos.User.UserCreateDto;
import hr.fer.pi.planinarskidnevnik.dtos.User.UserHeaderDto;
import hr.fer.pi.planinarskidnevnik.dtos.User.UserProfilePageDto;
import hr.fer.pi.planinarskidnevnik.dtos.User.UserSearchDto;
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
    public ResponseEntity<?> getUserCommunity(Principal principal) {
        LOGGER.info("User fetching by name");
        final List<UserSearchDto> list = userService.getUserCommunity(principal);
        return ResponseEntity.ok(list);
    }

    @GetMapping("role/{id}")
    public ResponseEntity<?> getUserRoleById(@PathVariable("id") final Long userId) {
        LOGGER.info("User fetching");
        final User user = userService.getUserById(userId);
        return ResponseEntity.ok(userService.getRole(user.getEmail()));
    }

    @GetMapping("is-admin")
    public ResponseEntity<Boolean> getIsAdmin(Principal principal) {
        LOGGER.info("User fetching");
        return ResponseEntity.ok(userService.getRole(principal.getName()).equals("ADMIN"));
    }

    @GetMapping("profileOwner/{id}")
    public ResponseEntity<Boolean> isProfileOwner(@PathVariable("id") final Long profileId, Principal principal) {
        LOGGER.info("Checking if current user is profile owner");
        final Boolean isOwner = userService.isOwner(profileId, principal.getName());
        return ResponseEntity.ok(isOwner);
    }

    @GetMapping("/me")
    public ResponseEntity<UserHeaderDto> getCurrentUser(Principal principal) {
        LOGGER.info("Getting current user");
        return ResponseEntity.ok(userService.getHeaderInformation(principal));
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

    @GetMapping(value = "/profile/{id}")
    public ResponseEntity<UserProfilePageDto> getProfilePageInfo(@PathVariable("id") final Long profileId, Principal principal) {
        return ResponseEntity.ok(userService.getProfilePageInfo(profileId, principal));
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
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

    @RequestMapping(value = "/archive-lodge/{lodge_id}", method = RequestMethod.PUT)
    public ResponseEntity<?> archiveMountainLodge(@PathVariable("lodge_id") final Long lodgeId, Principal principal) {
      userService.archiveMountainLodge(lodgeId, principal);
      return ResponseEntity.ok("Dom uspjesno spremljen.");
    };

}
