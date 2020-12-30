package hr.fer.pi.planinarskidnevnik.services;

import hr.fer.pi.planinarskidnevnik.models.MountainLodgeUserArchive.MountainLodgeUserArchive;
import java.security.Principal;

public interface MountainLodgeUserArchiveService {

    MountainLodgeUserArchive archiveMountainLodge(Long lodgeId, Principal principal);

}
