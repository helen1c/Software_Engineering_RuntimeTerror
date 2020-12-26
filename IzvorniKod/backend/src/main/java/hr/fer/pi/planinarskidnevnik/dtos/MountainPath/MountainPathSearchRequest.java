package hr.fer.pi.planinarskidnevnik.dtos.MountainPath;

import java.sql.Time;

public class MountainPathSearchRequest {

    private String name;
    private Long hillId;
    private Time avgWalkTimeMinimum;
    private Time avgWalkTimeMaximum;
    private Short difficultyMinimum;
    private Short difficultyMaximum;
    private Short lengthMin;
    private Short lengthMax;

    public Short getLengthMax() {
        return lengthMax;
    }

    public Short getLengthMin() {
        return lengthMin;
    }

    public void setLengthMax(Short lengthMax) {
        this.lengthMax = lengthMax;
    }

    public void setLengthMin(Short lengthMin) {
        this.lengthMin = lengthMin;
    }

    public Long getHillId() {
        return hillId;
    }

    public void setHillId(Long hillId) {
        this.hillId = hillId;
    }

    public Short getDifficultyMaximum() {return difficultyMaximum;}

    public void setDifficultyMaximum(Short difficultyMaximum) {this.difficultyMaximum = difficultyMaximum;}

    public Short getDifficultyMinimum() {return difficultyMinimum;}

    public void setDifficultyMinimum(Short difficultyMinimum) {this.difficultyMinimum = difficultyMinimum;}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Time getAvgWalkTimeMinimum() {
        return avgWalkTimeMinimum;
    }

    public void setAvgWalkTimeMinimum(Time avgWalkTimeMinimum) {
        this.avgWalkTimeMinimum = avgWalkTimeMinimum;
    }

    public Time getAvgWalkTimeMaximum() {return avgWalkTimeMaximum;}

    public void setAvgWalkTimeMaximum(Time avgWalkTimeMaximum) {this.avgWalkTimeMaximum = avgWalkTimeMaximum;}
}
