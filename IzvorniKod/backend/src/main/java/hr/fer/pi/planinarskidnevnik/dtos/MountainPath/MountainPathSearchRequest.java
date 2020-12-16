package hr.fer.pi.planinarskidnevnik.dtos.MountainPath;

import java.sql.Time;

public class MountainPathSearchRequest {

    private String name;
    private String startPoint;
    private String endPoint;
    private Time avgWalkTime;
    private Long length;
    private Long hillId;

    public Long getHillId() {
        return hillId;
    }

    public void setHillId(Long hillId) {
        this.hillId = hillId;
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
}
