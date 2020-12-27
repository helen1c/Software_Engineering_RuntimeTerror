package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.FriendshipRequest;
import hr.fer.pi.planinarskidnevnik.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendshipRequestRepository extends JpaRepository<FriendshipRequest, Long> {

    List<FriendshipRequest> getAllByTargetUser(User targetUser);

    boolean existsBySourceUserAndTargetUser(User sourceUser, User targetUser);

    Optional<FriendshipRequest> getBySourceUserAndTargetUser(User sourceUser, User targetUser);
}
