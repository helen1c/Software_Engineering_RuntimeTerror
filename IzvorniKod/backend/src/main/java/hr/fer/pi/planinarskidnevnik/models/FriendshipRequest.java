package hr.fer.pi.planinarskidnevnik.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "friendship_request")
public class FriendshipRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @OneToMany
    private List<User> subComments = new ArrayList<>();

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private User sender;

    public FriendshipRequest(String id, List<User> subComments, User sender) {
        this.id = id;
        this.subComments = subComments;
        this.sender = sender;
    }

    public FriendshipRequest() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<User> getSubComments() {
        return subComments;
    }

    public void setSubComments(List<User> subComments) {
        this.subComments = subComments;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }
}
