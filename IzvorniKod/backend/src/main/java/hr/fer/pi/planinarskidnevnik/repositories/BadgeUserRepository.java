package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.UserBadge.UserBadge;
import hr.fer.pi.planinarskidnevnik.models.UserBadge.UserBadgeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BadgeUserRepository extends JpaRepository<UserBadge, UserBadgeId> {
}
