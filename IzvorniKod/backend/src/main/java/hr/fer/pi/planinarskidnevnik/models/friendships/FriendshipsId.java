package hr.fer.pi.planinarskidnevnik.models.friendships;

import hr.fer.pi.planinarskidnevnik.models.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class FriendshipsId implements Serializable {

    @Column(name = "current_user_id")
    private Long currentUserId;

    @Column(name = "friend_id")
    private Long friendId;

    public FriendshipsId(Long currentUserId, Long friendId) {
        this.currentUserId = currentUserId;
        this.friendId = friendId;
    }

    public FriendshipsId() {
    }

    public Long getCurrentUserId() {
        return currentUserId;
    }

    public void setCurrentUserId(Long currentUserId) {
        this.currentUserId = currentUserId;
    }

    public Long getFriendId() {
        return friendId;
    }

    public void setFriendId(Long friendId) {
        this.friendId = friendId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FriendshipsId that = (FriendshipsId) o;
        return currentUserId.equals(that.currentUserId) && friendId.equals(that.friendId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(currentUserId, friendId);
    }
}
