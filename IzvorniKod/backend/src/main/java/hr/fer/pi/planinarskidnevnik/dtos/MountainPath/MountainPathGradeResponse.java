package hr.fer.pi.planinarskidnevnik.dtos.MountainPath;

public class MountainPathGradeResponse {
    private Long mountainPathId;

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
