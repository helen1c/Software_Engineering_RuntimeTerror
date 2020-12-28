package hr.fer.pi.planinarskidnevnik.models;


import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.sql.Date;

@Entity
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    private String name;

    private String description;

    private Date date_created;

    private Date start_date;

    private Date end_date;





    public CommunityEvent(){}

    public CommunityEvent(String name, String description, Date date_created, Date start_date, Date end_date){
        this.name=name;
        this.description=description;
        this.date_created=date_created;
        this.start_date=start_date;
        this.end_date=end_date;
    }

    public Long getId() {
        return id;
    }

    public String getName() { return name; }

    public String getDescription() {
        return description;
    }

    public Date getDateCreated() {
        return date_created;
    }

    public Date getStartDate() {
        return start_date;
    }

    public Date getEndDate() {
        return end_date;
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
        this.date_created = date_created;
    }

    public void setStartDate(Date start_date) {
        this.start_date = start_date;
    }

    public void setEndDate(Date end_date) {
        this.end_date = end_date;
    }
}
