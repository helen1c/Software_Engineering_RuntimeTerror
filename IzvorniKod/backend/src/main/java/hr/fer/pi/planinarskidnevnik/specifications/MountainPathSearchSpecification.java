package hr.fer.pi.planinarskidnevnik.specifications;

import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathSearchRequest;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.util.specification.BaseSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.sql.Time;
import java.util.Objects;

import static org.springframework.data.jpa.domain.Specification.where;

@Component
public class MountainPathSearchSpecification implements BaseSpecification<MountainPath, MountainPathSearchRequest> {

    @Override
    public Specification<MountainPath> getFilter(MountainPathSearchRequest request) {

        if(request.getName()== null) {
            request.setName("");
        }


        return ((root, query, cb) -> Objects.requireNonNull(where(mountainPathNameContains(request.getName().trim().replaceAll("\\s+", " ")))
                .and(mountainPathIsOnHill(request.getHillId())))
                .and(mountainPathAvgWalkTimeBetween(request.getAvgWalkTimeMinimum(), request.getAvgWalkTimeMaximum()))
                .and(mountainPathDifficultyBetween(request.getDifficultyMinimum(), request.getDifficultyMaximum()))
                .and(mountainPathLengthBetween(request.getLengthMin(), request.getLengthMax()))
                .and(notPrivate())
                .toPredicate(root, query, cb));

    }

    private Specification<MountainPath> notPrivate() {

        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("isPrivate").as(Boolean.class), Boolean.FALSE);

    }

    private Specification<MountainPath> mountainPathNameContains(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null) {
                return null;
            }

            return criteriaBuilder.like(criteriaBuilder.lower(root.get("name").as(String.class)), "%" + name.toLowerCase() + "%");
        };
    }

    private Specification<MountainPath> mountainPathDifficultyBetween(Short difficultyMinimum, Short difficultyMaximum) {
        return (root, query, criteriaBuilder) -> {
            if (difficultyMinimum == null || difficultyMaximum == null) {
                return null;
            }

            return criteriaBuilder.between(root.get("difficulty"), difficultyMinimum, difficultyMaximum);
        };
    }

    private Specification<MountainPath> mountainPathLengthBetween(Short lengthMin, Short lengthMax) {
        return (root, query, criteriaBuilder) -> {
            if (lengthMax == null || lengthMin == null) {
                return null;
            }

            return criteriaBuilder.between(root.get("length"), lengthMin, lengthMax);
        };

    }

    private Specification<MountainPath> mountainPathAvgWalkTimeBetween(Time avgWalkTimeMinimum, Time avgWalkTimeMaximum) {
        return (root, query, criteriaBuilder) -> {
            if (avgWalkTimeMaximum == null || avgWalkTimeMinimum == null) {
                return null;
            }

            return criteriaBuilder.between(root.get("avgWalkTime").as(Time.class), avgWalkTimeMinimum, avgWalkTimeMaximum);
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
