package hr.fer.pi.planinarskidnevnik.dtos.message;

import java.util.Objects;

public class MessageDto {

    private String name;
    private String content;
    //private Long userId;

    public MessageDto(){

    }
    public MessageDto(String name,String content){
        this.name = name;
        this.content = content;
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
