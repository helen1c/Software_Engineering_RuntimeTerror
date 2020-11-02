package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MountainLodgeRepository extends JpaRepository<MountainLodge, Long>, JpaSpecificationExecutor<MountainLodge> {

    

}
