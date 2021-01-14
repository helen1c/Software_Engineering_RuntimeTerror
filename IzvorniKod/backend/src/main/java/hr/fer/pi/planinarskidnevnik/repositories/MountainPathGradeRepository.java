package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.MountainPathGrade;
import hr.fer.pi.planinarskidnevnik.models.MountainPathGradeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MountainPathGradeRepository extends JpaRepository<MountainPathGrade, MountainPathGradeId> {
}
