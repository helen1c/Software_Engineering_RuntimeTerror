package hr.fer.pi.planinarskidnevnik.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.Objects;

@Entity(name = "MountainLodgeUserArchive")
@Table(name = "mountain_lodge_user_archive")
public class MountainLodgeUserArchive {

    @EmbeddedId
    private MountainLodgeUserArchiveId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("lodgeId")
    @JoinColumn(name="lodge_id")
    private MountainLodge mountainLodge;

    @Column(name = "DATE_ARCHIVED")
    @NotNull
    private Date dateArchived;


    public MountainLodgeUserArchive(User user, MountainLodge mountainLodge, Date dateArchived) {
        this.user = user;
        this.mountainLodge = mountainLodge;
        this.dateArchived = dateArchived;

        this.id = new MountainLodgeUserArchiveId(user.getId(), mountainLodge.getId());
    }

    public MountainLodgeUserArchive() {

    }


    public MountainLodgeUserArchiveId getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public MountainLodge getMountainLodge() {
        return mountainLodge;
    }

    public Date getDateArchived() {
        return dateArchived;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MountainLodgeUserArchive that = (MountainLodgeUserArchive) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(user, that.user) &&
                Objects.equals(mountainLodge, that.mountainLodge) &&
                Objects.equals(dateArchived, that.dateArchived);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, mountainLodge, dateArchived);
    }
}
