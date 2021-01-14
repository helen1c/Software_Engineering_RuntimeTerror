package hr.fer.pi.planinarskidnevnik.dtos.User;

public class UserHeaderDto {

    private Long id;

    private byte[] image;

    private int numberOfFriendRequests;

    private int numberOfNotifications;

    public UserHeaderDto(Long id, byte[] image) {
        this.id = id;
        this.image = image;
    }

    public UserHeaderDto(Long id, byte[] image, int numberOfFriendRequests) {
        this.id = id;
        this.image = image;
        this.numberOfFriendRequests = numberOfFriendRequests;
    }

    public UserHeaderDto(Long id, byte[] image, int numberOfFriendRequests, int numberOfNotifications) {
        this.id = id;
        this.image = image;
        this.numberOfFriendRequests = numberOfFriendRequests;
        this.numberOfNotifications = numberOfNotifications;
    }

    public int getNumberOfNotifications() {
        return numberOfNotifications;
    }

    public void setNumberOfNotifications(int numberOfNotifications) {
        this.numberOfNotifications = numberOfNotifications;
    }

    public int getNumberOfFriendRequests() {
        return numberOfFriendRequests;
    }

    public void setNumberOfFriendRequests(int numberOfFriendRequests) {
        this.numberOfFriendRequests = numberOfFriendRequests;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
