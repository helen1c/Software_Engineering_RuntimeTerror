package hr.fer.pi.planinarskidnevnik.dtos;

import hr.fer.pi.planinarskidnevnik.validation.email.UniqueEmail;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.Arrays;
import java.util.Objects;

public class UserCreateDto {

    @Size(max = 50, message = "Ime smije sadržavati najviše 50 znakova.")
    @NotBlank(message = "Ime je obavezno.")
    private String name;

    @NotBlank(message = "Lozinka je obavezna")
    @Size(min = 6, max = 32, message = "Lozinka mora biti između 6 i 32 znakova duga.")
    private String password;

    @Email(message = "E-mail mora biti u zadovoljavajućoj formi.")
    @NotBlank(message = "Email je obavezan.")
    @Size(max = 128, message = "E-mail smije sadržavati najviše 50 znakova.")
    @UniqueEmail(uniqueUser = false)
    private String email;

    @Size(max = 128, message = "E-mail smije sadržavati najviše 128 znakova.")
    private String placeOfResidence;

    private Date dateOfBirth;

    @Size(max = 2048, message = "Opis smije sadržavati najviše 2048 znakova.")
    private String description;

    private byte[] image;

    public UserCreateDto() {
    }

    public UserCreateDto(String name, String password, String email, String placeOfResidence, Date dateOfBirth, String description, byte[] image) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.placeOfResidence = placeOfResidence;
        this.dateOfBirth = dateOfBirth;
        this.description = description;
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    @Override
    public String toString() {
        return "UserCreateDto{" +
                "name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", placeOfResidence='" + placeOfResidence + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", description='" + description + '\'' +
                ", image=" + Arrays.toString(image) +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserCreateDto that = (UserCreateDto) o;
        return name.equals(that.name) &&
                password.equals(that.password) &&
                email.equals(that.email) &&
                Objects.equals(placeOfResidence, that.placeOfResidence) &&
                Objects.equals(dateOfBirth, that.dateOfBirth) &&
                Objects.equals(description, that.description) &&
                Arrays.equals(image, that.image);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(name, password, email, placeOfResidence, dateOfBirth, description);
        result = 31 * result + Arrays.hashCode(image);
        return result;
    }
}
