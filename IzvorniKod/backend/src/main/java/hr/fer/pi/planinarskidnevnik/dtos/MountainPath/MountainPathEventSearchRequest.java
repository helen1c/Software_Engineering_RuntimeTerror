package hr.fer.pi.planinarskidnevnik.dtos.MountainPath;

import java.sql.Time;

public class MountainPathEventSearchRequest {

    private Long id;
    private String hill;
    private String name;
    private String startPoint;
    private String endPoint;

    public MountainPathEventSearchRequest() {
    }

    public MountainPathEventSearchRequest(Long id, String hill, String name, String startPoint, String endPoint) {
        this.id = id;
        this.hill = hill;
        this.name = name;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHill() {
        return hill;
    }

    public void setHill(String hill) {
        this.hill = hill;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(String startPoint) {
        this.startPoint = startPoint;
    }

    public String getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(String endPoint) {
        this.endPoint = endPoint;
    }
}
