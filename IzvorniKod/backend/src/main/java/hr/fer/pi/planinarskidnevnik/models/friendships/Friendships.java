package hr.fer.pi.planinarskidnevnik.models.friendships;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import hr.fer.pi.planinarskidnevnik.models.User;

import javax.persistence.*;

@Entity(name = "Friendships")
@Table(name = "friendships")
public class Friendships {

    @EmbeddedId
    private FriendshipsId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("currentUserId")
    @JoinColumn(name = "current_user_id")
    private User currentUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("friendId")
    @JoinColumn(name = "friend_id")
    private User friend;

    public Friendships() {
    }

    public Friendships(User currentUser, User friend) {
        this.id = new FriendshipsId(currentUser.getId(), friend.getId());
        this.currentUser = currentUser;
        this.friend = friend;
    }

    public FriendshipsId getId() {
        return id;
    }

    public void setId(FriendshipsId id) {
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
