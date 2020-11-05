package hr.fer.pi.planinarskidnevnik.dtos;

import hr.fer.pi.planinarskidnevnik.models.request.PageSearchRequest;

import java.util.List;

public class MountainLodgeSearchRequest extends PageSearchRequest {

    private String searchText;

    private Long hillId;

    private List<String> utilities;

    public List<String> getUtilities() {
        return utilities;
    }

    public Long getHillId() {
        return hillId;
    }

    public String getSearchText() {
        return searchText;
    }

}
