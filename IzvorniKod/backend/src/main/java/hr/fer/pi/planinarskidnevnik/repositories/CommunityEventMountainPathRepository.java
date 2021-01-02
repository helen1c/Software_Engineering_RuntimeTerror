package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.CommunityEvent;
import hr.fer.pi.planinarskidnevnik.models.UserEvent.CommunityEventMountainPath;
import hr.fer.pi.planinarskidnevnik.models.UserEvent.CommunityEventMountainPathId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityEventMountainPathRepository extends JpaRepository<CommunityEventMountainPath, CommunityEventMountainPathId> {

    List<CommunityEventMountainPath> findAllByEvent(CommunityEvent event);
}
