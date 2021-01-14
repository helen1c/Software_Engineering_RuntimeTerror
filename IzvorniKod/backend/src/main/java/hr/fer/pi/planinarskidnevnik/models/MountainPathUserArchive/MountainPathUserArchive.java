package hr.fer.pi.planinarskidnevnik.models.MountainPathUserArchive;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.models.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.Objects;

@Entity(name = "MountainPathUserArchive")
@Table(name = "mountain_path_user_archive")
public class MountainPathUserArchive {

    @EmbeddedId
    private MountainPathUserArchiveId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("pathId")
    @JoinColumn(name = "path_id")
    @JsonIgnore
    private MountainPath mountainPath;

    @Column(name = "DATE_ARCHIVED")
    @NotNull
    private Date dateArchived;

    public MountainPathUserArchive(User user, MountainPath mountainPath, Date dateArchived) {
        this.user = user;
        this.mountainPath = mountainPath;
        this.dateArchived = dateArchived;

        this.id = new MountainPathUserArchiveId(user.getId(), mountainPath.getId());
    }

    public MountainPathUserArchive() {

    }

    public MountainPathUserArchiveId getId() {
        return id;
    }

    public void setId(MountainPathUserArchiveId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public MountainPath getMountainPath() {
        return mountainPath;
    }

    public void setMountainPath(MountainPath mountainPath) {
        this.mountainPath = mountainPath;
    }

    public Date getDateArchived() {
        return dateArchived;
    }

    public void setDateArchived(Date dateArchived) {
        this.dateArchived = dateArchived;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MountainPathUserArchive that = (MountainPathUserArchive) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(user, that.user) &&
                Objects.equals(mountainPath, that.mountainPath) &&
                Objects.equals(dateArchived, that.dateArchived);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, mountainPath, dateArchived);
    }
}
