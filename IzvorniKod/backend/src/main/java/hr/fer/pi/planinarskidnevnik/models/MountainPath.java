package hr.fer.pi.planinarskidnevnik.models;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Date;
import java.util.Objects;

@Entity(name = "MOUNTAIN_PATH")
public class MountainPath {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "mountain_path_id_gen")
    @SequenceGenerator(name = "mountain_path_id_gen", sequenceName = "mountain_path_id_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Hill hill;

    private String name;

    private String startPoint;

    private String endPoint;

    private Time avgWalkTime;

    private Long length;

    private Long seaLevelDiff;

    private Date dateCreated;

    private boolean isPrivate;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User author;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Hill getHill() {
        return hill;
    }

    public void setHill(Hill hill) {
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

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MountainPath that = (MountainPath) o;
        return isPrivate == that.isPrivate &&
                Objects.equals(id, that.id) &&
                Objects.equals(hill, that.hill) &&
                Objects.equals(name, that.name) &&
                Objects.equals(startPoint, that.startPoint) &&
                Objects.equals(endPoint, that.endPoint) &&
                Objects.equals(avgWalkTime, that.avgWalkTime) &&
                Objects.equals(length, that.length) &&
                Objects.equals(seaLevelDiff, that.seaLevelDiff) &&
                Objects.equals(dateCreated, that.dateCreated) &&
                Objects.equals(author, that.author);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, hill, name, startPoint, endPoint, avgWalkTime, length, seaLevelDiff, dateCreated, isPrivate, author);
    }
}
