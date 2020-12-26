package hr.fer.pi.planinarskidnevnik.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserBadgeId implements Serializable {
    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "BADGE_ID")
    private Long badgeId;

    public UserBadgeId() {

    }

    public UserBadgeId(Long userId, Long badgeId) {
        this.userId = userId;
        this.badgeId = badgeId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getBadgeId() {
        return badgeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserBadgeId that = (UserBadgeId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(badgeId, that.badgeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, badgeId);
    }
}
