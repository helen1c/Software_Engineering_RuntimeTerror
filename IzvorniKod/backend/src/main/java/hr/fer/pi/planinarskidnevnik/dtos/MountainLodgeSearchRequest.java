package hr.fer.pi.planinarskidnevnik.dtos;

import hr.fer.pi.planinarskidnevnik.models.request.PageSearchRequest;

import java.util.List;

public class MountainLodgeSearchRequest extends PageSearchRequest {

    private String searchText;

    private String hill;

    private List<String> utilities;

    public List<String> getUtilities() {
        return utilities;
    }

    public String getHill() {
        return hill;
    }

    public String getSearchText() {
        return searchText;
    }

}
