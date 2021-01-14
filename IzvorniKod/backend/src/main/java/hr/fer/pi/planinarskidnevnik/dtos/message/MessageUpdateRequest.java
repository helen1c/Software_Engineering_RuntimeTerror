package hr.fer.pi.planinarskidnevnik.dtos.message;

import hr.fer.pi.planinarskidnevnik.models.MessageStatus;

public class MessageUpdateRequest {
    private Long id;
    private MessageStatus status;

    @Override
    public String toString() {
        return "MessageUpdateRequest{" +
                "id=" + id +
                ", status=" + status +
                '}';
    }

    public MessageUpdateRequest(Long id, MessageStatus status) {
        this.id = id;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MessageStatus getStatus() {
        return status;
    }

    public void setStatus(MessageStatus status) {
        this.status = status;
    }
}
