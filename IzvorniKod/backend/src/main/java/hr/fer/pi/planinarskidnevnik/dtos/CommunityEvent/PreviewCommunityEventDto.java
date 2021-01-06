package hr.fer.pi.planinarskidnevnik.dtos.CommunityEvent;

import hr.fer.pi.planinarskidnevnik.dtos.User.UserSearchDto;

import java.sql.Date;
import java.util.List;

public class PreviewCommunityEventDto {

    private UserSearchDto user;

    private String name;

    private String description;

    //    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date date_created;

    //    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date start_date;

    //    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date end_date;

    private List<MountainPathOnDateDtoResponse> paths;

    private List<ParticipantDto> participantDtos;

    public List<ParticipantDto> getParticipantDtos() {
        return participantDtos;
    }

    public void setParticipantDtos(List<ParticipantDto> participantDtos) {
        this.participantDtos = participantDtos;
    }

    public List<MountainPathOnDateDtoResponse> getPaths() {
        return paths;
    }

    public void setPaths(List<MountainPathOnDateDtoResponse> paths) {
        this.paths = paths;
    }

    public PreviewCommunityEventDto() {
    }

    public PreviewCommunityEventDto(UserSearchDto user, String name, String description, Date date_created, Date start_date, Date end_date, List<MountainPathOnDateDtoResponse> paths) {
        this.user = user;
        this.name = name;
        this.description = description;
        this.date_created = date_created;
        this.start_date = start_date;
        this.end_date = end_date;
        this.paths = paths;
    }

    public UserSearchDto getUser() {
        return user;
    }

    public void setUser(UserSearchDto user) {
        this.user = user;
    }

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

    public Date getDate_created() {
        return date_created;
    }

    public void setDate_created(Date date_created) {
        this.date_created = date_created;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }

}
