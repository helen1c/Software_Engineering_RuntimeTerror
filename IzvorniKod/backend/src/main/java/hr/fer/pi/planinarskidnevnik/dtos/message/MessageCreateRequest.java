package hr.fer.pi.planinarskidnevnik.dtos.message;

import hr.fer.pi.planinarskidnevnik.models.MessageStatus;
import hr.fer.pi.planinarskidnevnik.models.User;

import java.util.Objects;

public class MessageCreateRequest {

    private String name;
    private String content;
    private MessageStatus status;

    public MessageStatus getStatus() {
        return status;
    }

    public void setStatus(MessageStatus status) {
        this.status = status;
    }

    public MessageCreateRequest(String name, String content, MessageStatus status) {
        this.name = name;
        this.content = content;
        this.status = status;
    }

    public MessageCreateRequest(){

    }
    public MessageCreateRequest(String name, String content){
        this.name = name;
        this.content = content;
//        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "MessageDto{" +
                "name='" + name + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
    @Override
    public int hashCode() {
        return Objects.hash(name, content);
    }
}
