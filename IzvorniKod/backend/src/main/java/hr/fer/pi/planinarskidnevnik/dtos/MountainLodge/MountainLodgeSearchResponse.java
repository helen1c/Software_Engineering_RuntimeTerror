package hr.fer.pi.planinarskidnevnik.dtos.MountainLodge;

import hr.fer.pi.planinarskidnevnik.models.Utility;

import java.util.List;

public class MountainLodgeSearchResponse {

    private Long id;
    private String name;
    private byte[] image;
    private List<Utility> utilities;
    private Long elevation;
    private String hillName;

    public Long getId() {
        return id;
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

    public void setUtilities(List<Utility> utilities) {
        this.utilities = utilities;
    }

    public void setElevation(Long elevation) {
        this.elevation = elevation;
    }

    public String getName() {
        return name;
    }

    public byte[] getImage() {
        return image;
    }

    public List<Utility> getUtilities() {
        return utilities;
    }

    public Long getElevation() {
        return elevation;
    }

    public String getHillName() {
        return hillName;
    }

    public void setHillName(String hillName) {
        this.hillName = hillName;
    }
}
