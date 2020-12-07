package hr.fer.pi.planinarskidnevnik.dtos.MountainPath;


import java.util.Date;

public class MountainPathFindResponse {

    private Long id;
    private String hill;
    private String name;
    private String startPoint;
    private String endPoint;
    private int avgWalkTime;
    private int length;
    private int seaLevelDiff;
    private Date dateCreated;
    private boolean isPrivate;

    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public String getHill() { return hill;}

    public void setHill(String hill) {this.hill = hill;}

    public String getName() {return name;}

    public void setName(String name) {this.name = name;}

    public String getStartPoint() {return startPoint;}

    public void setStartPoint(String startPoint) {this.startPoint = startPoint;}

    public String getEndPoint() {return endPoint;}

    public void setEndPoint(String endPoint) {this.endPoint = endPoint;}

    public int getAvgWalkTime() { return avgWalkTime;}

    public void setAvgWalkTime(int avgWalkTime) {this.avgWalkTime = avgWalkTime;}

    public int getLength() {return length;}

    public void setLength(int length) {this.length = length;}

    public int getSeaLevelDiff() {return seaLevelDiff;}

    public void setSeaLevelDiff(int seaLevelDiff) {this.seaLevelDiff = seaLevelDiff;}

    public Date getDateCreated() {return dateCreated;}

    public void setDateCreated(Date dateCreated) {this.dateCreated = dateCreated;}

    public boolean isPrivate() {return isPrivate;}

    public void setPrivate(boolean aPrivate) {isPrivate = aPrivate;}
}
