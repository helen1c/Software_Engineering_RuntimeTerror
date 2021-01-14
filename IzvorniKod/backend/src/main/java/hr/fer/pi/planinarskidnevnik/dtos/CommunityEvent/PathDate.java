package hr.fer.pi.planinarskidnevnik.dtos.CommunityEvent;

import hr.fer.pi.planinarskidnevnik.models.MountainPath;

import java.sql.Date;

public class PathDate {

    private MountainPath path;

    private Date date;

    public PathDate(MountainPath path, Date date) {
        this.path = path;
        this.date = date;
    }

    public PathDate() {
    }

    public MountainPath getPath() {
        return path;
    }

    public void setPath(MountainPath path) {
        this.path = path;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
