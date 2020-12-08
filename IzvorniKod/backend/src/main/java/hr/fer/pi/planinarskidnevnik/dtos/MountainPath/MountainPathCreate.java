package hr.fer.pi.planinarskidnevnik.dtos.MountainPath;

import hr.fer.pi.planinarskidnevnik.models.Hill;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.models.User;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.Objects;

public class MountainPathCreate {

    private Hill hill;

    @Size(max = 128, message = "Ime smije sadržavati najviše 128 znakova.")
    @NotBlank(message = "Ime je obavezno")
    private String name;

    @Size(max = 128, message = "Početna točka smije sadržavati najviše 128 znakova.")
    @NotBlank(message = "Početna točka je obavezna")
    private String startPoint;

    @Size(max = 128, message = "Završna točka smije sadržavati najviše 128 znakova.")
    @NotBlank(message = "Završna točka je obavezna")
    private String endPoint;

    private int avgWalkTime;

    private int length;

    private int seaLevelDiff;

    private Date dateCreated;

    private boolean isPrivate;

    private User author;
    public MountainPathCreate(Hill hill, String name, String startPoint, String endPoint, int avgWalkTime,
                              int length, int seaLevelDiff, Date dateCreated, boolean isPrivate) {
        this.hill = hill;
        this.name = name;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.avgWalkTime = avgWalkTime;
        this.length = length;
        this.seaLevelDiff = seaLevelDiff;
        this.dateCreated = dateCreated;
        this.isPrivate = isPrivate;
    }

    public MountainPathCreate(){

    }


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
        if (!(o instanceof MountainPathCreate)) return false;
        MountainPathCreate that = (MountainPathCreate) o;
        return getAvgWalkTime() == that.getAvgWalkTime() &&
                getLength() == that.getLength() &&
                getSeaLevelDiff() == that.getSeaLevelDiff() &&
                isPrivate() == that.isPrivate() &&
                hill.equals(that.hill) &&
                getName().equals(that.getName()) &&
                getStartPoint().equals(that.getStartPoint()) &&
                getEndPoint().equals(that.getEndPoint()) &&
                getDateCreated().equals(that.getDateCreated()) &&
                author.equals(that.author);
    }

    @Override
    public int hashCode() {
        return Objects.hash(hill, getName(), getStartPoint(), getEndPoint(), getAvgWalkTime(), getLength(), getSeaLevelDiff(), getDateCreated(), isPrivate(), author);
    }
}
