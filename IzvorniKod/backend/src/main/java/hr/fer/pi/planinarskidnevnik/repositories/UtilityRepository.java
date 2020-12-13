package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.Utility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UtilityRepository extends JpaRepository<Utility, Long> {

    List<Utility> findAllByOrderByNameAsc();

}
