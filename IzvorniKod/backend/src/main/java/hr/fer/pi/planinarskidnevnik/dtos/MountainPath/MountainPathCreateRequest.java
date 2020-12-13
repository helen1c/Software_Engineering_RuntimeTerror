package hr.fer.pi.planinarskidnevnik.dtos.MountainPath;

import com.fasterxml.jackson.annotation.JsonFormat;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.Objects;

public class MountainPathCreateRequest {

    private Long hillId;

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

    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dateCreated;

    private boolean isPrivate;

    private Long authorId;

    public MountainPathCreateRequest(long hillId, String name, String startPoint, String endPoint, int avgWalkTime,
                                     int length, int seaLevelDiff, Date dateCreated, boolean isPrivate, long authorId) {
        this.hillId = hillId;
        this.name = name;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.avgWalkTime = avgWalkTime;
        this.length = length;
        this.seaLevelDiff = seaLevelDiff;
        this.dateCreated = dateCreated;
        this.isPrivate = isPrivate;
        this.authorId = authorId;
    }

    public MountainPathCreateRequest(){

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

    public Long getHillId() {return hillId;}

    public void setHillId(long hillId) {this.hillId = hillId;}

    public Long getAuthorId() {return authorId;}

    public void setAuthorId(Long author) {this.authorId = authorId;}

    @Override
    public String toString() {
        return "MountainPath{" +
                ", hillId=" + hillId +
                ", name='" + name + '\'' +
                ", startPoint='" + startPoint + '\'' +
                ", endPoint='" + endPoint + '\'' +
                ", avgWalkTime=" + avgWalkTime +
                ", length=" + length +
                ", seaLevelDiff=" + seaLevelDiff +
                ", dateCreated=" + dateCreated +
                ", isPrivate=" + isPrivate +
                ", authorId=" + authorId +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MountainPathCreateRequest)) return false;
        MountainPathCreateRequest that = (MountainPathCreateRequest) o;
        return getAvgWalkTime() == that.getAvgWalkTime() &&
                getLength() == that.getLength() &&
                getSeaLevelDiff() == that.getSeaLevelDiff() &&
                isPrivate() == that.isPrivate() &&
                hillId.equals(that.hillId) &&
                getName().equals(that.getName()) &&
                getStartPoint().equals(that.getStartPoint()) &&
                getEndPoint().equals(that.getEndPoint()) &&
                getDateCreated().equals(that.getDateCreated()) &&
                authorId ==that.authorId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(hillId, getName(), getStartPoint(), getEndPoint(), getAvgWalkTime(), getLength(), getSeaLevelDiff(), getDateCreated(), isPrivate(), authorId);
    }
}
