package hr.fer.pi.planinarskidnevnik.dtos.CommunityEvent;

import hr.fer.pi.planinarskidnevnik.models.MountainPath;

import java.sql.Date;

public class PathDateIdDto {

    private Long pathId;

    private Date date;

    public PathDateIdDto() {
    }

    public PathDateIdDto(Long pathId, Date date) {
        this.pathId = pathId;
        this.date = date;
    }

    public Long getPathId() {
        return pathId;
    }

    public void setPathId(Long pathId) {
        this.pathId = pathId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
