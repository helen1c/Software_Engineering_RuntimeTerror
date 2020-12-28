package hr.fer.pi.planinarskidnevnik.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Date;

public class CommunityEventDto {
    private Long userId;

    private String userName;

    @Size(max = 50, message = "Ime smije sadržavati najviše 50 znakova.")
    @NotBlank(message = "Ime je obavezno.")
    private String name;

    @Size(max = 450, message = "Opis smije sadržavati najviše 450 znakova.")
    private String description;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date date_created;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date start_date;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date end_date;

    public CommunityEventDto() {
    }


    public CommunityEventDto(String name, String description,  Date date_created, Date start_date, Date end_date) {
        this.name=name;
        this.description=description;
        this.date_created=date_created;
        this.start_date=start_date;
        this.end_date=end_date;
    }

    public Long getUserId() { return userId; }

    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserName() { return userName; }

    public void setUserName(String userName) { this.userName = userName; }


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
        return date_created;
    }

    public void setDateCreated(Date date_created) {
        this.date_created = date_created;
    }

    public Date getStartDate() {
        return start_date;
    }

    public void setStartDate(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEndDate() {
        return end_date;
    }

    public void setEndDate(Date end_date) {
        this.end_date = end_date;
    }


}
