package hr.fer.pi.planinarskidnevnik.util.specification;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;

public interface BaseSpecification<T, U> {

    Specification<T> getFilter(U request);

    default Specification<T> attributeContains(String attribute, String value) {
        return (root, query, cb) -> {
            if (value == null) {
                return null;
            }

            return cb.like(cb.lower(pathOf(root, attribute).as(String.class)), "%" + value.toLowerCase() + "%");
        };
    }

    default <E> Specification<T> attributeEquals(String attribute, E value) {
        return (root, query, cb) -> {
            if (value == null) {
                return null;
            }

            return cb.equal(pathOf(root, attribute), value);
        };
    }

    private static <T> Path<T> pathOf(Root<T> root, String attribute) {
        Path<T> path = root;
        var sp = attribute.split("\\.");

        for (String part : sp) {
            path = path.get(part);
        }

        return path;
    }

}
