package hr.fer.pi.planinarskidnevnik.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class MountainPathGradeId implements Serializable {
    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "PATH_ID")
    private Long pathId;

    public MountainPathGradeId() {

    }

    public MountainPathGradeId(Long userId, Long pathId) {
        this.userId = userId;
        this.pathId = pathId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getPathId() {
        return pathId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MountainPathGradeId that = (MountainPathGradeId) o;
        return Objects.equals(getUserId(), that.getUserId()) && Objects.equals(getPathId(), that.getPathId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserId(), getPathId());
    }
}
