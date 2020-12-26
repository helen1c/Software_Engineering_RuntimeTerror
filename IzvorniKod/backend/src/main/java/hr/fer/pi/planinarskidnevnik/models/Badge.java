package hr.fer.pi.planinarskidnevnik.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "BADGE")
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "badge_id_gen")
    @SequenceGenerator(name = "badge_id_gen", sequenceName = "badge_id_seq", allocationSize = 1)
    private Long id;

    private String name;

    private String description;

    @OneToMany(mappedBy = "badge")
    private List<UserBadge> userBadgeList = new ArrayList<>();

    public Badge() {
    }

    public Badge(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
