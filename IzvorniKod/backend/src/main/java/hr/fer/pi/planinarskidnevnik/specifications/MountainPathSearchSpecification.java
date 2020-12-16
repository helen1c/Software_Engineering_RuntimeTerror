package hr.fer.pi.planinarskidnevnik.specifications;

import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathSearchRequest;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.util.specification.BaseSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import static org.springframework.data.jpa.domain.Specification.where;

@Component
public class MountainPathSearchSpecification implements BaseSpecification<MountainPath, MountainPathSearchRequest> {

    @Override
    public Specification<MountainPath> getFilter(MountainPathSearchRequest request) {

        return ((root, query, cb) -> where(mountainPathNameContains(request.getName().trim().replaceAll("\\s+", " ")))
                .and(mountainPathIsOnHill(request.getHillId()))
                .and(mountainPathStartPointContains(request.getStartPoint().trim().replaceAll("\\s+", " ")))
                .and(mountainPathEndPointContains(request.getEndPoint().trim().replaceAll("\\s+", " ")))
                .and(mountainPathLengthLessOrEqualTo(request.getLength()))
                .toPredicate(root, query, cb));

    }

    private Specification<MountainPath> mountainPathNameContains(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null) {
                return null;
            }

            return criteriaBuilder.like(criteriaBuilder.lower(root.get("name").as(String.class)), "%" + name.toLowerCase() + "%");
        };
    }

    private Specification<MountainPath> mountainPathStartPointContains(String startPoint) {
        return (root, query, criteriaBuilder) -> {
            if (startPoint == null) {
                return null;
            }

            return criteriaBuilder.like(criteriaBuilder.lower(root.get("startPoint").as(String.class)), "%" + startPoint.toLowerCase() + "%");
        };
    }

    private Specification<MountainPath> mountainPathEndPointContains(String endPoint) {
        return (root, query, criteriaBuilder) -> {
            if (endPoint == null) {
                return null;
            }

            return criteriaBuilder.like(criteriaBuilder.lower(root.get("endPoint").as(String.class)), "%" + endPoint.toLowerCase() + "%");
        };
    }

    private Specification<MountainPath> mountainPathLengthLessOrEqualTo(Long length) {
        return (root, query, criteriaBuilder) -> {
            if (length == null) {
                return null;
            }

            return criteriaBuilder.le(root.get("length"), length);
        };
    }

    private Specification<MountainPath> mountainPathIsOnHill(Long id) {

        return (root, query, criteriaBuilder) -> {
            if (id == null) {
                return null;
            }

            return criteriaBuilder.equal(root.get("hill").get("id").as(Long.class), id);
        };
    }
}
