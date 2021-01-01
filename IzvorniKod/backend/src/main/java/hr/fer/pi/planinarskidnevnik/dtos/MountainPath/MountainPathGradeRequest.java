package hr.fer.pi.planinarskidnevnik.dtos.MountainPath;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class MountainPathGradeRequest {

    @NotNull
    private Long mountainPathId;

    @Min(1)
    @Max(5)
    @NotNull
    private Integer grade;

    public Long getMountainPathId() {
        return mountainPathId;
    }

    public void setMountainPathId(Long mountainPathId) {
        this.mountainPathId = mountainPathId;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }
}
