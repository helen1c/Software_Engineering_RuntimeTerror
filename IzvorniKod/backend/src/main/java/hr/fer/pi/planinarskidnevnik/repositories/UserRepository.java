package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    Optional<User> findByName(String name);

    boolean existsByEmailAndIdNot(String email, Long id);

    List<User> getAllByIdNot(Long id);
}
