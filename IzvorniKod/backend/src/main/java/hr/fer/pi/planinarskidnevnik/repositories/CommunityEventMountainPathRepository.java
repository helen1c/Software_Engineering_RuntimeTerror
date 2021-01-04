package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.CommunityEvent;
import hr.fer.pi.planinarskidnevnik.models.UserEvent.CommunityEventMountainPath;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityEventMountainPathRepository extends JpaRepository<CommunityEventMountainPath, Long> {

    List<CommunityEventMountainPath> findAllByEvent(CommunityEvent event);
}
