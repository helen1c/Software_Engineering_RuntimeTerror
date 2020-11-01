package hr.fer.pi.planinarskidnevnik.models;

import javax.persistence.*;

@Entity
public class Hill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "hill_id_gen")
    @SequenceGenerator(name = "hill_id_gen", sequenceName = "hill_id_seq", allocationSize = 1)
    private Long id;

    private String name;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }
}

