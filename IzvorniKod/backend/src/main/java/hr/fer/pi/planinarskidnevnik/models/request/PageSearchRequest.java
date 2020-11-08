package hr.fer.pi.planinarskidnevnik.models.request;


import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class PageSearchRequest {

    private static final int DEFAULT_PAGE_SIZE = 10;
    private static final int DEFAULT_PAGE_NUMBER = 0;
    private static final String DEFAULT_SORT_DIRECTION = "ASC";
    private static final String DEFAULT_SORT_BY = "id";

    @Min(value = 0)
    @NotNull
    private int page = DEFAULT_PAGE_NUMBER;

    @Min(value = 1)
    @NotNull
    private int size = DEFAULT_PAGE_SIZE;

    private String[] sortBy = new String[] { DEFAULT_SORT_BY };

    private String sortDirection = DEFAULT_SORT_DIRECTION;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String[] getSortBy() {
        return sortBy;
    }

    public void setSortBy(String[] sortBy) {
        this.sortBy = sortBy;
    }

    public String getSortDirection() {
        return sortDirection;
    }

    public void setSortDirection(String sortDirection) {
        this.sortDirection = sortDirection;
    }

    public Pageable toPageRequest() {
        return org.springframework.data.domain.PageRequest.of(page, size, Sort.Direction.fromString(sortDirection), sortBy);
    }

}
