package hr.fer.pi.planinarskidnevnik.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "MountainPathGrade")
@Table(name = "mountain_path_grade")
public class MountainPathGrade {
    @EmbeddedId
    private MountainPathGradeId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @MapsId("pathId")
    private MountainPath path;

    @Column(name = "grade")
    private Integer grade;

    public MountainPathGrade() {

    }

    public MountainPathGrade(User user, MountainPath path, Integer grade) {
        this.user = user;
        this.path = path;
        this.grade = grade;
        this.id = new MountainPathGradeId(user.getId(), path.getId());
    }

    public MountainPathGradeId getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public MountainPath getPath() {
        return path;
    }

    public Integer getGrade() {
        return grade;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MountainPathGrade that = (MountainPathGrade) o;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getUser(), that.getUser()) && Objects.equals(getPath(), that.getPath()) && Objects.equals(getGrade(), that.getGrade());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getUser(), getPath(), getGrade());
    }
}
