package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.MountainPathUserArchive.MountainPathUserArchive;
import hr.fer.pi.planinarskidnevnik.models.MountainPathUserArchive.MountainPathUserArchiveId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MountainPathUserArchiveRepository extends JpaRepository<MountainPathUserArchive, MountainPathUserArchiveId> {
}
