package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.MountainLodgeUserArchive.MountainLodgeUserArchive;
import hr.fer.pi.planinarskidnevnik.models.MountainLodgeUserArchive.MountainLodgeUserArchiveId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MountainLodgeUserArchiveRepository extends JpaRepository<MountainLodgeUserArchive, MountainLodgeUserArchiveId> {

    List<MountainLodgeUserArchive> findByUser_Id(Long id);

}
