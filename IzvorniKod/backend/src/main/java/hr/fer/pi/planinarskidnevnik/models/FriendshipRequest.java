package hr.fer.pi.planinarskidnevnik.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "friendship_request")
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
public class FriendshipRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @ManyToOne()
    @JoinColumn(name = "sender")
    //@Column(name = "sender")
    private User sourceUser;

    @ManyToOne()
    @JoinColumn(name = "receiver")
    //@Column(name = "receiver")
    private User targetUser;

    public FriendshipRequest(String id, User sourceUser, User targetUser) {
        this.id = id;
        this.sourceUser = sourceUser;
        this.targetUser = targetUser;
    }

    public FriendshipRequest(User sourceUser, User targetUser) {
        this.sourceUser = sourceUser;
        this.targetUser = targetUser;
    }

    public FriendshipRequest() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getSourceUser() {
        return sourceUser;
    }

    public void setSourceUser(User sourceUser) {
        this.sourceUser = sourceUser;
    }

    public User getTargetUser() {
        return targetUser;
    }

    public void setTargetUser(User targetUser) {
        this.targetUser = targetUser;
    }
}
