package hr.fer.pi.planinarskidnevnik.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import hr.fer.pi.planinarskidnevnik.models.MountainLodgeUserArchive.MountainLodgeUserArchive;
import hr.fer.pi.planinarskidnevnik.models.MountainPathUserArchive.MountainPathUserArchive;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Time;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
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

    @NotNull
    private String name;

    @NotNull
    private String startPoint;

    @NotNull
    private String endPoint;

    @NotNull
    private Short difficulty;

    @NotNull
    private Time avgWalkTime;

    @NotNull
    private Long length;

    private Long seaLevelDiff;

    @NotNull
    private Date dateCreated;

    @JsonProperty("isPrivate")
    private Boolean isPrivate;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User author;

    @OneToMany(mappedBy = "mountainPath")
    private List<MountainPathUserArchive> mountainPathUserArchive = new ArrayList<>();

    public List<MountainPathUserArchive> getMountainPathUserArchive() {
        return mountainPathUserArchive;
    }

    public void setMountainPathUserArchive(List<MountainPathUserArchive> mountainPathUserArchive) {
        this.mountainPathUserArchive = mountainPathUserArchive;
    }

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

    public Short getDifficulty() {return difficulty;}

    public void setDifficulty(Short difficulty) {this.difficulty = difficulty;}


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
