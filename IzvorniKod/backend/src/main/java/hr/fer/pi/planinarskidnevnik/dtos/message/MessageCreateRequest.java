package hr.fer.pi.planinarskidnevnik.dtos.message;

import java.util.Objects;

public class MessageCreateRequest {

    private String name;
    private String content;
    private Long userId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public MessageCreateRequest(){

    }
    public MessageCreateRequest(String name, String content,Long userId){
        this.name = name;
        this.content = content;
        this.userId = userId;
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
