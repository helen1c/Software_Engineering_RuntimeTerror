package hr.fer.pi.planinarskidnevnik.util.specification;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;
import java.util.List;

public interface BaseSpecification<T, U> {

    Specification<T> getFilter(U request);

}
