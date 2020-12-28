package hr.fer.pi.planinarskidnevnik.models.friendships;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import hr.fer.pi.planinarskidnevnik.models.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "friendship_request")
@Table(name = "friendship_request")
public class FriendshipRequest {

    @EmbeddedId
    private FriendshipRequestId id;

    @ManyToOne()
    @MapsId("sourceUserId")
    @JoinColumn(name = "sender")
    private User sourceUser;

    @ManyToOne()
    @MapsId("targetUserId")
    @JoinColumn(name = "receiver")
    private User targetUser;

    public FriendshipRequest( User sourceUser, User targetUser) {
        id = new FriendshipRequestId(sourceUser.getId(), targetUser.getId());
        this.sourceUser = sourceUser;
        this.targetUser = targetUser;
    }

    public FriendshipRequest() {
    }

    public FriendshipRequestId getId() {
        return id;
    }

    public void setId(FriendshipRequestId id) {
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
