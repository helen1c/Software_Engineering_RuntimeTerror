package hr.fer.pi.planinarskidnevnik.dtos.User;

import hr.fer.pi.planinarskidnevnik.dtos.Badge.BadgeDto;
import hr.fer.pi.planinarskidnevnik.validation.email.UniqueEmail;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.List;

public class UserProfilePageDto {

    private String name;

    private String email;

    private String placeOfResidence;

    private Date dateOfBirth;

    private String description;

    private Boolean isOwner;

    private Boolean isAdmin;

    private Boolean isFriend;

    private byte[] image;

    private List<BadgeDto> badges;

    public List<BadgeDto> getBadges() {
        return badges;
    }

    public UserProfilePageDto(String name, String email, String placeOfResidence, Date dateOfBirth, String description, byte[] image, boolean isOwner, boolean isAdmin, boolean isFriend, List<BadgeDto> badges) {
        this.name = name;
        this.email = email;
        this.placeOfResidence = placeOfResidence;
        this.dateOfBirth = dateOfBirth;
        this.description = description;
        this.image = image;
        this.isOwner = isOwner;
        this.isAdmin = isAdmin;
        this.isFriend = isFriend;
        this.badges = badges;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPlaceOfResidence() {
        return placeOfResidence;
    }

    public void setPlaceOfResidence(String placeOfResidence) {
        this.placeOfResidence = placeOfResidence;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public boolean getIsOwner() {
        return isOwner;
    }

    public void setIsOwner(boolean owner) {
        isOwner = owner;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean admin) {
        isAdmin = admin;
    }

    public Boolean getOwner() {
        return isOwner;
    }

    public void setOwner(Boolean owner) {
        isOwner = owner;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }

    public Boolean getFriend() {
        return isFriend;
    }

    public void setFriend(Boolean friend) {
        isFriend = friend;
    }

    public void setBadges(List<BadgeDto> badges) {
        this.badges = badges;
    }
}
