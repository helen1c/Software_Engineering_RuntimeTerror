package hr.fer.pi.planinarskidnevnik.dtos.User;

import hr.fer.pi.planinarskidnevnik.validation.email.UniqueEmail;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Date;

public class UserProfilePageDto {

    private String name;

    private String email;

    private String placeOfResidence;

    private Date dateOfBirth;

    private String description;

    private byte[] image;

    private boolean isOwner;

    private boolean isAdmin;

    public UserProfilePageDto(String name, String email, String placeOfResidence, Date dateOfBirth, String description, byte[] image, boolean isOwner, boolean isAdmin) {
        this.name = name;
        this.email = email;
        this.placeOfResidence = placeOfResidence;
        this.dateOfBirth = dateOfBirth;
        this.description = description;
        this.image = image;
        this.isOwner = isOwner;
        this.isAdmin = isAdmin;
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

    public boolean isOwner() {
        return isOwner;
    }

    public void setOwner(boolean owner) {
        isOwner = owner;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
