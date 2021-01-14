package hr.fer.pi.planinarskidnevnik.dtos.CommunityEvent;

public class EventAttendanceParticipatingResponse {

    private Long userId;
    private String message;
    private Long eventId;
    private String name;

    public String getName() {
        return name;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
