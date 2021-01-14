package hr.fer.pi.planinarskidnevnik.dtos;

import javax.validation.constraints.NotNull;
import java.sql.Date;

public class MountainPathArchiveResponse {

    @NotNull
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String hillName;

    @NotNull
    private Date dateArchived;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHillName() {
        return hillName;
    }

    public void setHillName(String hillName) {
        this.hillName = hillName;
    }

    public Date getDateArchived() {
        return dateArchived;
    }

    public void setDateArchived(Date dateArchived) {
        this.dateArchived = dateArchived;
    }
}
