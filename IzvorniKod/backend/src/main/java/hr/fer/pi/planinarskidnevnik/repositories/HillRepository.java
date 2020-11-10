package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.Hill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HillRepository  extends JpaRepository<Hill, Long> {

    List<Hill> findAllByOrderByNameAsc();

}
