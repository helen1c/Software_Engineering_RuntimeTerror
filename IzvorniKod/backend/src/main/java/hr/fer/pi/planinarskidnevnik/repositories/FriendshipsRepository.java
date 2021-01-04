package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.friendships.Friendships;
import hr.fer.pi.planinarskidnevnik.models.friendships.FriendshipsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendshipsRepository extends JpaRepository<Friendships, FriendshipsId> {
}
