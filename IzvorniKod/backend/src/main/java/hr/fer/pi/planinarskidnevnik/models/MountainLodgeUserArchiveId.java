package hr.fer.pi.planinarskidnevnik.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class MountainLodgeUserArchiveId implements Serializable {

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "LODGE_ID")
    private Long lodgeId;

    public Long getLodgeId() {
        return lodgeId;
    }

    public Long getUserId() {
        return userId;
    }

    public MountainLodgeUserArchiveId(Long userId, Long lodgeId) {
        this.userId = userId;
        this.lodgeId = lodgeId;
    }

    public MountainLodgeUserArchiveId() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MountainLodgeUserArchiveId that = (MountainLodgeUserArchiveId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(lodgeId, that.lodgeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, lodgeId);
    }
}
