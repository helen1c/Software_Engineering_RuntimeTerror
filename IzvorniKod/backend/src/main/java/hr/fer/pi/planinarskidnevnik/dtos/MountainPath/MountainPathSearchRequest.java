package hr.fer.pi.planinarskidnevnik.dtos.MountainPath;

import java.sql.Time;

public class MountainPathSearchRequest {

    private String name;
    private Time avgWalkTimeMinimum;
    private Time avgWalkTimeMaximum;
    private Long hillId;
    private Short difficultyMinimum;
    private Short difficultyMaximum;

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
