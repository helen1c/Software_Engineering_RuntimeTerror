package hr.fer.pi.planinarskidnevnik.services;

import hr.fer.pi.planinarskidnevnik.models.MountainLodgeUserArchive;
import java.util.List;
import java.security.Principal;

public interface MountainLodgeUserArchiveService {

    MountainLodgeUserArchive archiveMountainLodge(Long lodgeId, Principal principal);

    List<MountainLodgeUserArchive> getAllForUser(Principal principal);

}
