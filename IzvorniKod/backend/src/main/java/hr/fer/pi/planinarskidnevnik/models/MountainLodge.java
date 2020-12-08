package hr.fer.pi.planinarskidnevnik.models;

import javax.persistence.*;
import java.util.List;

@Entity(name = "MOUNTAIN_LODGE")
public class MountainLodge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "mountain_lodge_id_gen")
    @SequenceGenerator(name = "mountain_lodge_id_gen", sequenceName = "mountain_lodge_id_seq", allocationSize = 1)
    @Column(name = "LODGE_ID")
    private Long id;

    private String name;

    private byte[] image;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Hill hill;

    @ManyToMany
    @JoinTable(
            name = "mountain_lodge_utility",
            joinColumns = @JoinColumn(name = "LODGE_ID"),
            inverseJoinColumns = @JoinColumn(name = "UTILITY_ID")
    )

    private List<Utility> utilities;

    private Long elevation;


    public MountainLodge(){

    }
    public MountainLodge(String name, Long elevation, Hill hillName, List<Utility> utilities, byte[] image) {
        this.name = name;
        this.elevation = elevation;
        this.hill = hillName;
        this.utilities = utilities;
        this.image = image;
    }
    public Long getElevation() {
        return elevation;
    }

    public void setElevation(Long elevation) {
        this.elevation = elevation;
    }

    public String getName() {
        return name;
    }

    public Long getId() {
        return id;
    }

    public byte[] getImage() {
        return image;
    }

    public Hill getHill() {
        return hill;
    }

    public List<Utility> getUtilities() {
        return utilities;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public void setHill(Hill hill) {
        this.hill = hill;
    }

    public void setUtilities(List<Utility> utilities) {
        this.utilities = utilities;
    }
}
