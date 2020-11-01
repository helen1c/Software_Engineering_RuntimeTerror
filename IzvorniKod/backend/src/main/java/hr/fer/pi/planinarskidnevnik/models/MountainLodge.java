package hr.fer.pi.planinarskidnevnik.models;

import com.sun.istack.Nullable;

import javax.persistence.*;
import java.util.List;

@Entity
public class MountainLodge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "mountain_lodge_id_gen")
    @SequenceGenerator(name = "mountain_lodge_id_gen", sequenceName = "mountain_lodge_id_seq", allocationSize = 1)
    @Column(name = "lodge_id")
    private Long id;

    private String name;

    @Nullable
    private byte[] image;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Hill hill;

    @ManyToMany
    @JoinTable(
            name = "utility",
            joinColumns = @JoinColumn(name = "lodge_id"),
            inverseJoinColumns = @JoinColumn(name = "utility_id")
    )
    private List<MountainLodgeUtility> utilities;

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


}