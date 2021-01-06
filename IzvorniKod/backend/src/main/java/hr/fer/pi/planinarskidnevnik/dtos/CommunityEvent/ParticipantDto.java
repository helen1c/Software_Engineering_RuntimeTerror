package hr.fer.pi.planinarskidnevnik.dtos.CommunityEvent;

public class ParticipantDto {

    private Long userId;
    private String name;

    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
