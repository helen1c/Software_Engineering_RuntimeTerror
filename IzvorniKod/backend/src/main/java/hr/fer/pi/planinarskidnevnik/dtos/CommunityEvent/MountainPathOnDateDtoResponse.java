package hr.fer.pi.planinarskidnevnik.dtos.CommunityEvent;

import java.sql.Date;

public class MountainPathOnDateDtoResponse {

    private Long id;
    private String name;
    private String startPoint;
    private String endPoint;
    private String hillName;
    private Short difficulty;
    private Long length;
    private Date dateTraveled;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getHillName() {
        return hillName;
    }

    public void setHillName(String hillName) {
        this.hillName = hillName;
    }

    public Short getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Short difficulty) {
        this.difficulty = difficulty;
    }

    public Long getLength() {
        return length;
    }

    public void setLength(Long length) {
        this.length = length;
    }

    public Date getDateTraveled() {
        return dateTraveled;
    }

    public void setDateTraveled(Date dateTraveled) {
        this.dateTraveled = dateTraveled;
    }
}
