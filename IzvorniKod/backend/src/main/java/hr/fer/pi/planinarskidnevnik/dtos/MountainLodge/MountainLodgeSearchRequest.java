package hr.fer.pi.planinarskidnevnik.dtos.MountainLodge;

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

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }

    public void setHillId(Long hillId) {
        this.hillId = hillId;
    }

    public void setUtilities(List<Long> utilities) {
        this.utilities = utilities;
    }
}
