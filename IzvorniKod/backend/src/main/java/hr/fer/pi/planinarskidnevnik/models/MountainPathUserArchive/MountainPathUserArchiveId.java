package hr.fer.pi.planinarskidnevnik.models.MountainPathUserArchive;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class MountainPathUserArchiveId implements Serializable {

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "PATH_ID")
    private Long pathId;

    public MountainPathUserArchiveId() {

    }

    public MountainPathUserArchiveId(Long userId, Long pathId) {
        this.userId = userId;
        this.pathId = pathId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MountainPathUserArchiveId that = (MountainPathUserArchiveId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(pathId, that.pathId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, pathId);
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPathId() {
        return pathId;
    }

    public void setPathId(Long pathId) {
        this.pathId = pathId;
    }
}
