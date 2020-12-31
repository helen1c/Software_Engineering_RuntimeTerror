package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Optional;

@Repository
public interface MountainPathRepository extends JpaRepository<MountainPath, Long>, JpaSpecificationExecutor<MountainPath> {
    List<MountainPath> findAllByOrderByNameAsc();

    Optional<MountainPath> findByName(String name);

    List<MountainPath> findAllByAuthor_EmailOrderByNameAsc(String email);

    List<MountainPath> getAllByIsPrivateFalseOrderByNameAsc();

    Optional<MountainPath> findById(Long id);
}
