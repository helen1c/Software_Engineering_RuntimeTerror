package hr.fer.pi.planinarskidnevnik.models;


import com.fasterxml.jackson.annotation.*;
import hr.fer.pi.planinarskidnevnik.models.UserEvent.CommunityEventMountainPath;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "event")
@Table(name = "event")
public class CommunityEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "event_id_gen")
    @SequenceGenerator(name = "event_id_gen", sequenceName = "event_id_seq", allocationSize = 1)
    @Column(name = "event_id")
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    private String name;

    private String description;

    private Date dateCreated;

    private Date startDate;

    private Date endDate;

    @OneToMany(mappedBy = "event")
    @JsonManagedReference
    private List<CommunityEventMountainPath> paths = new ArrayList<>();

    public CommunityEvent(){}

    public CommunityEvent(String name, String description, Date dateCreated, Date startDate, Date endDate){
        this.name=name;
        this.description=description;
        this.dateCreated = dateCreated;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public CommunityEvent(Long id, User user, String name, String description, Date dateCreated, Date startDate, Date endDate, List<CommunityEventMountainPath> paths) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.description = description;
        this.dateCreated = dateCreated;
        this.startDate = startDate;
        this.endDate = endDate;
        this.paths = paths;
    }

    public CommunityEvent(Long id, User user, String name, String description, Date dateCreated, Date startDate, Date endDate) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.description = description;
        this.dateCreated = dateCreated;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getName() { return name; }

    public String getDescription() {
        return description;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDateCreated(Date date_created) {
        this.dateCreated = date_created;
    }

    public void setStartDate(Date start_date) {
        this.startDate = start_date;
    }

    public void setEndDate(Date end_date) {
        this.endDate = end_date;
    }

    public List<CommunityEventMountainPath> getPaths() {
        return paths;
    }

    public void setPaths(List<CommunityEventMountainPath> paths) {
        this.paths = paths;
    }

    @Override
    public String toString() {
        return "CommunityEvent{" +
                "id=" + id +
                ", user=" + user +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", date_created=" + dateCreated +
                ", start_date=" + startDate +
                ", end_date=" + endDate +
                '}';
    }
}
