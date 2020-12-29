package hr.fer.pi.planinarskidnevnik.models.UserEvent;

import com.fasterxml.jackson.annotation.JsonBackReference;
import hr.fer.pi.planinarskidnevnik.models.CommunityEvent;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.Objects;

@Entity(name = "CommunityEventMountainPath")
@Table(name = "community_event_mountain_path")
public class CommunityEventMountainPath {

    @EmbeddedId
    private CommunityEventMountainPathId id;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("eventId")
    @JoinColumn(name = "event_id")
    @JsonBackReference
    private CommunityEvent event;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("pathId")
    @JoinColumn(name = "path_id")
    @JsonBackReference
    private MountainPath path;

    @Column(name = "date_traveled")
    @NotNull
    private Date dateArchived;

    public CommunityEventMountainPath(CommunityEvent event, MountainPath path, @NotNull Date dateArchived) {
        this.event = event;
        this.path = path;
        this.dateArchived = dateArchived;

        this.id = new CommunityEventMountainPathId(event.getId(), path.getId());
    }

    public CommunityEventMountainPath() {
    }

    public CommunityEventMountainPathId getId() {
        return id;
    }

    public CommunityEvent getEvent() {
        return event;
    }

    public MountainPath getPath() {
        return path;
    }

    public Date getDateArchived() {
        return dateArchived;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommunityEventMountainPath that = (CommunityEventMountainPath) o;
        return id.equals(that.id) && event.equals(that.event) && path.equals(that.path) && dateArchived.equals(that.dateArchived);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, event, path, dateArchived);
    }
}
