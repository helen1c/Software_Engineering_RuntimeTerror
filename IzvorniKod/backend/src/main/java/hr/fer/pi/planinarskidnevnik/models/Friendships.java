package hr.fer.pi.planinarskidnevnik.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity
@Table(name = "friendships")
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Friendships {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "current_user_id")
    private User currentUser;

    @ManyToOne()
    @JoinColumn(name = "friend_id")
    private User friend;

    public Friendships() {
    }

    public Friendships(User currentUser, User friend) {
        this.currentUser = currentUser;
        this.friend = friend;
    }

    public Friendships(Long id, User currentUser, User friend) {
        this.id = id;
        this.currentUser = currentUser;
        this.friend = friend;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(User currentUser) {
        this.currentUser = currentUser;
    }

    public User getFriend() {
        return friend;
    }

    public void setFriend(User friend) {
        this.friend = friend;
    }
}
