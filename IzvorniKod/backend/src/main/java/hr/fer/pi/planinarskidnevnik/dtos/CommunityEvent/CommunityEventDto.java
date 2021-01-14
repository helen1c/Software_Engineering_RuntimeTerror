package hr.fer.pi.planinarskidnevnik.dtos.CommunityEvent;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.List;

public class CommunityEventDto {
    private Long userId;

    @Size(max = 50, message = "Ime smije sadržavati najviše 50 znakova.")
    @NotBlank(message = "Ime je obavezno.")
    private String name;

    @Size(max = 450, message = "Opis smije sadržavati najviše 450 znakova.")
    private String description;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date dateCreated;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date startDate;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date endDate;

    private List<PathDateIdDto> paths;

    public CommunityEventDto() {
    }


    public CommunityEventDto(String name, String description, Date dateCreated, Date startDate, Date endDate) {
        this.name=name;
        this.description=description;
        this.dateCreated = dateCreated;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getUserId() { return userId; }

    public void setUserId(Long userId) { this.userId = userId; }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<PathDateIdDto> getPaths() {
        return paths;
    }

    public void setPaths(List<PathDateIdDto> paths) {
        this.paths = paths;
    }
}
