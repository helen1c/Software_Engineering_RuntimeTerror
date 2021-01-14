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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "community_event_mountain_path_id_gen")
    @SequenceGenerator(name = "community_event_mountain_path_id_gen", sequenceName = "community_event_mountain_path_id_seq", allocationSize = 1)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id")
    @JsonBackReference
    private CommunityEvent event;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "path_id")
    @JsonBackReference
    private MountainPath path;

    @MapsId("dateArchivedId")
    @Column(name = "date_traveled")
    private Date dateArchived;

    public CommunityEventMountainPath(Long id, CommunityEvent event, MountainPath path, Date dateArchived) {
        this.id = id;
        this.event = event;
        this.path = path;
        this.dateArchived = dateArchived;
    }

    public CommunityEventMountainPath(CommunityEvent event, MountainPath path, Date dateArchived) {
        this.event = event;
        this.path = path;
        this.dateArchived = dateArchived;
    }

    public CommunityEventMountainPath() {
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

    public void setId(Long id) {
        this.id = id;
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
