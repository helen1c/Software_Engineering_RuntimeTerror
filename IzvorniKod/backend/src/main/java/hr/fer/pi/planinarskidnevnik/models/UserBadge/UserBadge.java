package hr.fer.pi.planinarskidnevnik.models.UserBadge;

import hr.fer.pi.planinarskidnevnik.models.Badge;
import hr.fer.pi.planinarskidnevnik.models.User;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity(name = "UserBadge")
@Table(name = "user_badge")
public class UserBadge {
    @EmbeddedId
    private UserBadgeId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("badgeId")
    private Badge badge;

    @Column(name = "DATE_RECEIVED")
    private java.sql.Date dateReceived;

    public UserBadge(User user, Badge badge) {
        this.user = user;
        this.badge = badge;
        this.dateReceived = new java.sql.Date(System.currentTimeMillis());
        this.id = new UserBadgeId(user.getId(), badge.getId());
    }

    public UserBadge() {

    }

    public UserBadgeId getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Badge getBadge() {
        return badge;
    }

    public Date getDateReceived() {
        return dateReceived;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserBadge userBadge = (UserBadge) o;
        return Objects.equals(id, userBadge.id) && Objects.equals(user, userBadge.user) && Objects.equals(badge, userBadge.badge) && Objects.equals(dateReceived, userBadge.dateReceived);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, badge, dateReceived);
    }
}
