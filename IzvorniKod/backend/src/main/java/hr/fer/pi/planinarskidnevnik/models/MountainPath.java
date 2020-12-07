package hr.fer.pi.planinarskidnevnik.models;

import javax.persistence.*;
import java.util.Date;
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

    private int avgWalkTime;

    private int length;

    private int seaLevelDiff;

    private Date dateCreated;

    private boolean isPrivate;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User author;

    public MountainPath(Hill hill, String name, String startPoint, String endPoint,
                        int avgWalkTime, int length, int seaLevelDiff, Date dateCreated, boolean isPrivate, User author) {
        this.hill = hill;
        this.name = name;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.avgWalkTime = avgWalkTime;
        this.length = length;
        this.seaLevelDiff = seaLevelDiff;
        this.dateCreated = dateCreated;
        this.isPrivate = isPrivate;
        this.author = author;
    }

    public MountainPath() {

    }

    public Long getId(){return id;}

    public String getName() {return name;}

    public void setName(String name) {this.name = name;}

    public String getStartPoint() {return startPoint;}

    public void setStartPoint(String startPoint) {this.startPoint = startPoint;}

    public String getEndPoint() {return endPoint; }

    public void setEndPoint(String endPoint) {this.endPoint = endPoint;}

    public int getAvgWalkTime() {return avgWalkTime;}

    public void setAvgWalkTime(int avgWalkTime) {this.avgWalkTime = avgWalkTime;}

    public int getLength() {return length;}

    public void setLength(int length) {this.length = length;}

    public int getSeaLevelDiff() {return seaLevelDiff;}

    public void setSeaLevelDiff(int seaLevelDiff) {this.seaLevelDiff = seaLevelDiff;}

    public Date getDateCreated() {return dateCreated;}

    public void setDateCreated(Date dateCreated) {this.dateCreated = dateCreated;}

    public boolean isPrivate() {return isPrivate;}

    public void setPrivate(boolean aPrivate) {isPrivate = aPrivate;}

    public Hill getHill() {return hill;}

    public void setHill(Hill hill) {this.hill = hill;}

    public User getAuthor() {return author;}

    public void setAuthor(User author) {this.author = author;}

    @Override
    public String toString() {
        return "MountainPath{" +
                "id=" + id +
                ", hill=" + hill +
                ", name='" + name + '\'' +
                ", startPoint='" + startPoint + '\'' +
                ", endPoint='" + endPoint + '\'' +
                ", avgWalkTime=" + avgWalkTime +
                ", length=" + length +
                ", seaLevelDiff=" + seaLevelDiff +
                ", dateCreated=" + dateCreated +
                ", isPrivate=" + isPrivate +
                ", author=" + author +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MountainPath)) return false;
        MountainPath that = (MountainPath) o;
        return getAvgWalkTime() == that.getAvgWalkTime() &&
                getLength() == that.getLength() &&
                getSeaLevelDiff() == that.getSeaLevelDiff() &&
                isPrivate() == that.isPrivate() &&
                id.equals(that.id) &&
                hill.equals(that.hill) &&
                getName().equals(that.getName()) &&
                getStartPoint().equals(that.getStartPoint()) &&
                getEndPoint().equals(that.getEndPoint()) &&
                getDateCreated().equals(that.getDateCreated()) &&
                author.equals(that.author);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, hill, getName(), getStartPoint(), getEndPoint(), getAvgWalkTime(), getLength(), getSeaLevelDiff(), getDateCreated(), isPrivate(), author);
    }
}
