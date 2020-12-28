package hr.fer.pi.planinarskidnevnik.dtos.MountainPath;


import java.sql.Date;
import java.sql.Time;

public class MountainPathSearchResponse {

    private Long id;
    private String hill;
    private String name;
    private String startPoint;
    private String endPoint;
    private Time avgWalkTime;
    private Long length;
    private Long seaLevelDiff;
    private Date dateCreated;
    private boolean isPrivate;
    private Short difficulty;

    public Short getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Short difficulty) {
        this.difficulty = difficulty;
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

    public Time getAvgWalkTime() {
        return avgWalkTime;
    }

    public void setAvgWalkTime(Time avgWalkTime) {
        this.avgWalkTime = avgWalkTime;
    }

    public Long getLength() {
        return length;
    }

    public void setLength(Long length) {
        this.length = length;
    }

    public Long getSeaLevelDiff() {
        return seaLevelDiff;
    }

    public void setSeaLevelDiff(Long seaLevelDiff) {
        this.seaLevelDiff = seaLevelDiff;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }
}
