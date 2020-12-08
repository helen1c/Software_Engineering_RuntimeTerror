package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.dtos.UserCreateDto;
import hr.fer.pi.planinarskidnevnik.dtos.UserSearchDto;
import hr.fer.pi.planinarskidnevnik.exceptions.NoImageException;
import hr.fer.pi.planinarskidnevnik.exceptions.ResourceNotFoundException;
import hr.fer.pi.planinarskidnevnik.exceptions.UserWithEmailExistsException;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final String DEFAULT_PROFILE_IMAGE = "/images/planinar.jpeg";

    public UserService(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public Optional<User> findByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            LOGGER.info("User with email {} doesn't exist", email);
            return Optional.empty();
        }

        return optionalUser;
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
            throw new UserWithEmailExistsException("Korisnik s emailom već postoji.");
        }
        final User user = new User(userCreateDto.getName(), encoder.encode(userCreateDto.getPassword()), userCreateDto.getEmail(), userCreateDto.getPlaceOfResidence(), userCreateDto.getDateOfBirth(), userCreateDto.getDescription(), userCreateDto.getImage());
        userRepository.save(user);
        LOGGER.info("New user {} created", user);
        return user;
    }

    public byte[] getImage(String username) {
        User user = checkForEmail(username);

        if (user.getImage() == null) {
            try {
                BufferedImage bufferedImage = ImageIO.read(getClass().getResource(DEFAULT_PROFILE_IMAGE));
                ByteArrayOutputStream baos = new ByteArrayOutputStream();

                ImageIO.write(bufferedImage, "jpeg", baos);
                baos.flush();
                byte[] imageInByte = baos.toByteArray();
                baos.close();

                return imageInByte;
            } catch (IOException exc) {
                LOGGER.error("Can't get image from URL: " + DEFAULT_PROFILE_IMAGE);
                throw new NoImageException();
            }
        }

        return user.getImage();
    }

    public User checkForEmail(String email) {
        Optional<User> user = findUserByEmail(email);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("Ne postoji korisnik s korisničkim e-mailom: " + email);
        }

        return user.get();
    }

    public Optional<User> findUserByEmail(final String email) {
        final Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            LOGGER.info("User with email {} doesn't exist", email);
            return Optional.empty();
        }
        return optionalUser;
    }

    public boolean existsUserWithEmailAndNotId(String email, Long id) {
        boolean exists = userRepository.existsByEmailAndIdNot(email, id);
        if (exists) {
            throw new UserWithEmailExistsException("Korisnik s emailom " + email + " već postoji.");
        }
        return exists;
    }

    public List<UserSearchDto> getUserByName(String userName) { //userName je ono sto smo unijeli
        List<User> allUsers = userRepository.findAll();  //dohvatimo listu svih Usera
        List<UserSearchDto> searchResult = new ArrayList<>();

        for (User u : allUsers) {
            if (u.getName().toLowerCase().contains(userName.toLowerCase())) {
                searchResult.add(new UserSearchDto(u.getId(), u.getImage(), u.getName()));
            }
        }

        return searchResult;
    }
}
