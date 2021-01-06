package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.CommunityEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface CommunityEventRepository extends JpaRepository<CommunityEvent, Long> {

    List<CommunityEvent> findAllByUser_IdAndStartDateIsAfterOrderByStartDateDesc(Long user_id, Date dateCreated);
    List<CommunityEvent> findAllByUser_IdOrderByStartDate(Long user_id);

}
