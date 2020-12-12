package hr.fer.pi.planinarskidnevnik.dtos.MountainLodge;

import hr.fer.pi.planinarskidnevnik.models.request.PageSearchRequest;

import java.util.List;

public class MountainLodgeSearchRequest {

    private String searchText;

    private Long hillId;

    private List<Long> utilities;

    public List<Long> getUtilities() {
        return utilities;
    }

    public Long getHillId() {
        return hillId;
    }

    public String getSearchText() {
        return searchText;
    }

}
