package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.dtos.Badge.BadgeDto;
import hr.fer.pi.planinarskidnevnik.dtos.MountainLodgeArchive.MountainLodgeArchiveResponse;
import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathGradeResponse;
import hr.fer.pi.planinarskidnevnik.dtos.MountainPathArchiveResponse;
import hr.fer.pi.planinarskidnevnik.dtos.User.UserCreateDto;
import hr.fer.pi.planinarskidnevnik.dtos.User.UserHeaderDto;
import hr.fer.pi.planinarskidnevnik.dtos.User.UserProfilePageDto;
import hr.fer.pi.planinarskidnevnik.dtos.User.UserSearchDto;
import hr.fer.pi.planinarskidnevnik.exceptions.IllegalAccessException;
import hr.fer.pi.planinarskidnevnik.exceptions.NoImageException;
import hr.fer.pi.planinarskidnevnik.exceptions.ResourceNotFoundException;
import hr.fer.pi.planinarskidnevnik.exceptions.UserWithEmailExistsException;
import hr.fer.pi.planinarskidnevnik.mappers.MountainLodgeArchiveToMountainLodgeArchiveResponseMapper;
import hr.fer.pi.planinarskidnevnik.mappers.MountainPathGradeToMountainPathGradeResponseMapper;
import hr.fer.pi.planinarskidnevnik.mappers.MountainPathUserArchiveToMountainPathArchiveResponseMapper;
import hr.fer.pi.planinarskidnevnik.models.MountainPathGrade;
import hr.fer.pi.planinarskidnevnik.models.Role;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.models.UserBadge.UserBadge;
import hr.fer.pi.planinarskidnevnik.models.friendships.FriendshipRequest;
import hr.fer.pi.planinarskidnevnik.repositories.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final FriendshipRequestRepository friendshipRequestRepository;
    private final FriendshipsRepository friendshipsRepository;
    private final PasswordEncoder encoder;
    private final String DEFAULT_PROFILE_IMAGE = "/images/planinar.jpeg";
    private final MountainLodgeArchiveToMountainLodgeArchiveResponseMapper lodgeArchiveResponseMapper;
    private final MountainPathUserArchiveToMountainPathArchiveResponseMapper pathArchiveResponseMapper;
    private final MountainPathGradeToMountainPathGradeResponseMapper pathGradeResponseMapper;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, FriendshipsRepository friendshipsRepository, FriendshipRequestRepository friendshipRequestRepository, MountainLodgeRepository mountainLodgeRepository, MountainLodgeArchiveToMountainLodgeArchiveResponseMapper lodgeArchiveResponseMapper, MountainPathUserArchiveToMountainPathArchiveResponseMapper pathArchiveResponseMapper, MountainPathGradeToMountainPathGradeResponseMapper pathGradeResponseMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.friendshipRequestRepository = friendshipRequestRepository;
        this.friendshipsRepository = friendshipsRepository;
        this.encoder = encoder;
        this.lodgeArchiveResponseMapper = lodgeArchiveResponseMapper;
        this.pathArchiveResponseMapper = pathArchiveResponseMapper;
        this.pathGradeResponseMapper = pathGradeResponseMapper;
    }

    public User getCurrentUser(Principal principal) {
        Optional<User> optionalCurrentUser = userRepository.findByEmail(principal.getName());
        if (optionalCurrentUser.isEmpty()) {
            LOGGER.error("User {} doesn't exist", principal.getName());
            throw new ResourceNotFoundException(String.format("Korisnik %s ne postoji", principal.getName()));
        }
        return optionalCurrentUser.get();
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
            throw new ResourceNotFoundException("Korisnik ne postoji");
        }
        return optionalUser.get();
    }

    public User createUser(UserCreateDto userCreateDto) {
        if (userRepository.existsByEmail(userCreateDto.getEmail())) {
            LOGGER.info("User with email {} cannot be created because user with same email already exists", userCreateDto.getEmail());
            throw new UserWithEmailExistsException("Korisnik s emailom već postoji.");
        }
        Role role = roleRepository.getOne(2L);
        final User user = new User(userCreateDto.getName(), encoder.encode(userCreateDto.getPassword()), userCreateDto.getEmail(), userCreateDto.getPlaceOfResidence(), userCreateDto.getDateOfBirth(), userCreateDto.getDescription(), userCreateDto.getImage(), role);
        userRepository.save(user);
        LOGGER.info("New user {} created", user);
        return user;
    }

    public byte[] getImage(String email) {
        User user = checkForEmail(email);

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

    public String getRole(String email) {
        return userRepository.findByEmail(email).get().getRole().getName();
    }

    public void deleteUser(Long userId, Principal principal) {
        User currentUser = getCurrentUser(principal);
        User userForRemoval = getUserById(userId);

        if (currentUser.getId().equals(userForRemoval.getId()) || getRole(currentUser.getEmail()).equals("ADMIN")) {
            userRepository.delete(userForRemoval);
        } else {
            LOGGER.error("Not allowed to delete user");
            throw new IllegalAccessException("Nemate dozvolu za brisanje ovog korisnika");
        }
        LOGGER.info("User with id {} removed", userId);
    }

    public User editCurrentUser(UserCreateDto userCreateDto, Principal principal) {
        User currentUser = getCurrentUser(principal);
        if (!currentUser.getEmail().equals(userCreateDto.getEmail())) {       //Makni ako se odluci mijenjat mail
            LOGGER.error("Not allowed to edit user");
            throw new IllegalAccessException("Nemate dozvolu za uređivanje ovog korisnika");
        }

        currentUser.setName(userCreateDto.getName());
        currentUser.setPlaceOfResidence(userCreateDto.getPlaceOfResidence());
        currentUser.setDateOfBirth(userCreateDto.getDateOfBirth());
        currentUser.setDescription(userCreateDto.getDescription());
        currentUser.setImage(userCreateDto.getImage());

        userRepository.save(currentUser);

        return currentUser;
    }

    public List<UserSearchDto> getUserCommunity(Principal principal) {
        User currentUser = getCurrentUser(principal);
        List<User> allUsers = currentUser.getFriends();
        List<UserSearchDto> searchResult = new ArrayList<>();

        for (User u : allUsers) {
            searchResult.add(new UserSearchDto(u.getId(), getImage(u.getEmail()), u.getName()));
        }

        return searchResult;
    }

    public boolean isOwner(Long id, String currentUserEmail) {
        Optional<User> optionalCurrentUser = userRepository.findByEmail(currentUserEmail);
        if (optionalCurrentUser.isEmpty()) {
            LOGGER.error("User {} doesn't exist", currentUserEmail);
            throw new ResourceNotFoundException(String.format("Korisnik %s ne postoji", currentUserEmail));
        }
        User currentUser = optionalCurrentUser.get();
        return currentUser.getId().equals(id);
    }

    public UserProfilePageDto getProfilePageInfo(Long profileId, Principal principal) {
        User user = getUserById(profileId);

        return new UserProfilePageDto(user.getName(),
                user.getEmail(),
                user.getPlaceOfResidence(),
                user.getDateOfBirth(),
                user.getDescription(),
                user.getImage() == null ? getImage(user.getEmail()) : user.getImage(),
                isOwner(profileId, principal.getName()),
                getRole(principal.getName()).equals("ADMIN"),
                isFriend(user, principal),
                convertToBadgeDto(user.getUserBadgeList()));
    }

    private boolean isFriend(User user, Principal principal) {
        User currentUser = getCurrentUser(principal);
        return currentUser.getFriends().contains(user);
    }

    public UserHeaderDto getHeaderInformation(Principal principal) {
        User user = getCurrentUser(principal);
        return new UserHeaderDto(user.getId(), getImage(user.getEmail()));
    }

    private List<BadgeDto> convertToBadgeDto(List<UserBadge> userBadgeList) {
        List<BadgeDto> badges = new ArrayList<>();
        for (UserBadge userBadge : userBadgeList) {
            BadgeDto badge = new BadgeDto();
            badge.setId(userBadge.getBadge().getId());
            badge.setName(userBadge.getBadge().getName());
            badge.setDescription(userBadge.getBadge().getDescription());
            badge.setDateReceived(userBadge.getDateReceived());
            badge.setImageURL(getBadgeImageURL(userBadge));
            badges.add(badge);
        }
        return badges;
    }

    private String getBadgeImageURL(UserBadge userBadge) {
        return "/api/images/" + userBadge.getBadge().getName() + ".png";
    }

    public List<MountainLodgeArchiveResponse> getArchivedLodges(Principal principal) {
        User currUser = getCurrentUser(principal);

        return lodgeArchiveResponseMapper.mapToList(currUser.getMountainLodgeUserArchive());
    }

    public List<MountainPathArchiveResponse> getArchivedPaths(Principal principal) {
        User currUser = getCurrentUser(principal);
        return pathArchiveResponseMapper.mapToList(currUser.getMountainPathUserArchive());
    }

    public List<MountainPathGradeResponse> getGradedPaths(Principal principal) {
        User currUser = getCurrentUser(principal);
        List<MountainPathGrade> mountainPathGradeList = currUser.getMountainPathGradeList();
        return pathGradeResponseMapper.mapToList(mountainPathGradeList);
    }

    public void sendFriendRequest(String email, Long friendId) {
        User sender = findByEmail(email).orElseThrow(() -> new ResourceNotFoundException(email));
        User receiver = userRepository.getOne(friendId);
        receiver.getFriendRequests().add(sender);
        userRepository.save(receiver);
    }

    public List<UserSearchDto> checkFriendRequests(String email) {
        User user = findByEmail(email).orElseThrow(() -> new ResourceNotFoundException(email));
        List<UserSearchDto> allRequests = new ArrayList<>();

        for (User u : user.getFriendRequests()) {
            allRequests.add(new UserSearchDto(u.getId(), getImage(u.getEmail()), u.getName()));
        }
        return allRequests;
    }

    public void acceptFriendRequest(Principal principal, Long senderId) {
        User sender = getUserById(senderId);
        User receiver = getCurrentUser(principal);

        List<User> friendshipRequests = receiver.getFriendRequests();
        if (friendshipRequests.contains(sender)) {
            friendshipRequests.remove(sender);
            sender.getFriends().add(receiver);
            receiver.getFriends().add(sender);
            sender.getFriendRequestsNotifications().add(receiver);
        }
        userRepository.save(sender);
        userRepository.save(receiver);
    }

    public void removeFriend(Principal principal, Long friendRemovedId) {
        User sender = getUserById(friendRemovedId);
        User currentUser = getCurrentUser(principal);

        sender.getFriends().remove(currentUser);
        sender.getFriendRequestsNotifications().remove(currentUser);
        currentUser.getFriends().remove(sender);
        currentUser.getFriendRequestsNotifications().remove(sender);

        userRepository.save(sender);
        userRepository.save(currentUser);
    }

    public List<UserSearchDto> getAllUsers(Principal principal) {
        User currentUser = getCurrentUser(principal);
        List<User> allUsers = userRepository.getAllByIdNot(currentUser.getId());
        List<UserSearchDto> searchResult = new ArrayList<>();

        for (User u : allUsers) {
            searchResult.add(new UserSearchDto(u.getId(), getImage(u.getEmail()), u.getName()));
        }

        return searchResult;
    }

    public void friendRequestDecline(Principal principal, Long senderId) {
        User sender = getUserById(senderId);
        User receiver = getCurrentUser(principal);

        List<User> friendshipRequests = receiver.getFriendRequests();
        friendshipRequests.remove(sender);
        userRepository.save(receiver);
    }
}
