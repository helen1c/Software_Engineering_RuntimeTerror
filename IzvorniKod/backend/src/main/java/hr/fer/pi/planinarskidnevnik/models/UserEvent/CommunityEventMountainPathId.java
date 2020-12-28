package hr.fer.pi.planinarskidnevnik.models.UserEvent;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CommunityEventMountainPathId implements Serializable {

    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "path_id")
    private Long pathId;

    public CommunityEventMountainPathId(Long eventId, Long pathId) {
        this.eventId = eventId;
        this.pathId = pathId;
    }

    public CommunityEventMountainPathId() {
    }

    public Long getEventId() {
        return eventId;
    }

    public Long getPathId() {
        return pathId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommunityEventMountainPathId that = (CommunityEventMountainPathId) o;
        return eventId.equals(that.eventId) && pathId.equals(that.pathId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(eventId, pathId);
    }
}
