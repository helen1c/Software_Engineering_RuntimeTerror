package hr.fer.pi.planinarskidnevnik.dtos.User;

public class UserFooterDto {

    private String role;

    public UserFooterDto(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
