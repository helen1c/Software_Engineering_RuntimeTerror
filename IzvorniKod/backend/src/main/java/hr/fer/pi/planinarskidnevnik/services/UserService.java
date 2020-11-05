package hr.fer.pi.planinarskidnevnik.services;

import hr.fer.pi.planinarskidnevnik.dtos.UserCreateDto;
import hr.fer.pi.planinarskidnevnik.exceptions.ResourceNotFoundException;
import hr.fer.pi.planinarskidnevnik.exceptions.UserWithEmailExistsException;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public UserService(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public User findByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            LOGGER.info("User with email {} doesn't exist", email);
            throw new ResourceNotFoundException("Ne postoji korisnik s e-mailom: " + email);
        }

        return optionalUser.get();
    }

    public User getUserById(Long userId) {
        LOGGER.info("Fetching of user with id {}", userId);
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            LOGGER.info("User with id {} doesn't exist", userId);
            throw new ResourceNotFoundException("jbg");
        }
        return optionalUser.get();
    }

    public User createUser(UserCreateDto userCreateDto) {
        if (userRepository.existsByEmail(userCreateDto.getEmail())) {
            LOGGER.info("User with email {} cannot be created because user with same email already exists", userCreateDto.getEmail());
            throw new UserWithEmailExistsException(String.format("Korisnik s emailom %s već postoji.", userCreateDto.getEmail()));
        }
        final User user = new User(userCreateDto.getName(), encoder.encode(userCreateDto.getPassword()), userCreateDto.getEmail(), userCreateDto.getPlaceOfResidence(), userCreateDto.getDateOfBirth(), userCreateDto.getDescription(), userCreateDto.getImage());
        userRepository.save(user);
        LOGGER.info("New user {} created", user);
        return user;
    }
}
