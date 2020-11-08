package hr.fer.pi.planinarskidnevnik.specifications;

import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeSearchRequest;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import hr.fer.pi.planinarskidnevnik.util.specification.BaseSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.*;

import static org.springframework.data.jpa.domain.Specification.where;

@Component
public class MountainLodgeSearchSpecification implements BaseSpecification<MountainLodge, MountainLodgeSearchRequest> {


    @Override
    public Specification<MountainLodge> getFilter(MountainLodgeSearchRequest request) {

        return ((root, query, cb) -> where(mountainLodgeNameContains(request.getSearchText().trim().replaceAll("\\s+", " ")))
                                    .and(mountainLodgeIsOnHill(request.getHillId()))
                                    .toPredicate(root, query, cb));

    }

    private Specification<MountainLodge> mountainLodgeNameContains(String searchText) {
        return (root, query, criteriaBuilder) -> {
            if (searchText == null) {
                return null;
            }

            return criteriaBuilder.like(criteriaBuilder.lower(root.get("name").as(String.class)), "%" + searchText.toLowerCase() + "%");
        };
    }

    private Specification<MountainLodge> mountainLodgeIsOnHill(Long id) {

        return (root, query, criteriaBuilder) -> {
            if (id == null) {
                return null;
            }

            return criteriaBuilder.equal(root.get("hill").get("id").as(Long.class), id);
        };
    }

}
