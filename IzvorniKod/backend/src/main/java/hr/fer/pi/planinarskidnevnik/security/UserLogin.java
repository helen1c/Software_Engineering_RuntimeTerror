package hr.fer.pi.planinarskidnevnik.security;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class UserLogin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50, message = "E-mail mora biti kraći od 50 znakova")
    @NotEmpty(message = "Unos e-maila je obavezan.")
    @Email(message = "Email mora biti u zadovoljavajućem formatu.")
    @Column(unique = true)
    private String email;


    @Size(max = 128, message = "Lozinka mora biti kraća od 50 znakova")
    @NotEmpty(message = "Unos lozinke je obavezan.")
    private String password;

    public UserLogin() {
    }

    public UserLogin(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public UserLogin(Long id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
