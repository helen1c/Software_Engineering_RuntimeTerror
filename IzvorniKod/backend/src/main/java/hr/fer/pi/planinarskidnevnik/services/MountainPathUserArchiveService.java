package hr.fer.pi.planinarskidnevnik.services;

import hr.fer.pi.planinarskidnevnik.models.MountainPathUserArchive.MountainPathUserArchive;

import java.security.Principal;

public interface MountainPathUserArchiveService {

    MountainPathUserArchive archiveMountainPath(Long pathId, Principal principal);

}
