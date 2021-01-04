package hr.fer.pi.planinarskidnevnik.models.friendships;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class FriendshipRequestId implements Serializable {

    @Column(name = "sender")
    private Long sourceUserId;

    @Column(name = "receiver")
    private Long targetUserId;

    public FriendshipRequestId() {
    }

    public FriendshipRequestId(Long sourceUserId, Long targetUserId) {
        this.sourceUserId = sourceUserId;
        this.targetUserId = targetUserId;
    }

    public Long getSourceUserId() {
        return sourceUserId;
    }

    public void setSourceUserId(Long sourceUserId) {
        this.sourceUserId = sourceUserId;
    }

    public Long getTargetUserId() {
        return targetUserId;
    }

    public void setTargetUserId(Long targetUserId) {
        this.targetUserId = targetUserId;
    }
}
