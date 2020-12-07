package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MountainPathRepository extends JpaRepository<MountainPath, Long> {
    List<MountainPath> findAllByOrderByNameAsc();
}
