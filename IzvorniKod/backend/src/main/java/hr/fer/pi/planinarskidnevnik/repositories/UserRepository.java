package hr.fer.pi.planinarskidnevnik.repositories;

import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import hr.fer.pi.planinarskidnevnik.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    Optional<User> findByName(String name);

    boolean existsByEmailAndIdNot(String email, Long id);

    List<User> getAllByIdNot(Long id);

    @Modifying
    @Query(value = "INSERT INTO mountain_lodge_user_archive(user_id, lodge_id) VALUES (?,?)", nativeQuery = true)
    @Transactional
    void archiveMountainLodge(Long userId, Long lodgeId);

}
