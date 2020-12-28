package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.models.MountainPathUserArchive.MountainPathUserArchive;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.repositories.MountainPathRepository;
import hr.fer.pi.planinarskidnevnik.repositories.MountainPathUserArchiveRepository;
import hr.fer.pi.planinarskidnevnik.services.MountainPathUserArchiveService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.Date;

@Service
public class MountainPathUserArchiveServiceImpl implements MountainPathUserArchiveService {

    private final UserService userService;
    private final MountainPathUserArchiveRepository mountainPathUserArchiveRepository;
    private final MountainPathRepository mountainPathRepository;

    public MountainPathUserArchiveServiceImpl(UserService userService, MountainPathUserArchiveRepository mountainPathUserArchiveRepository, MountainPathRepository mountainPathRepository) {
        this.userService = userService;
        this.mountainPathUserArchiveRepository = mountainPathUserArchiveRepository;
        this.mountainPathRepository = mountainPathRepository;
    }


    @Override
    public MountainPathUserArchive archiveMountainPath(Long pathId, Principal principal) {
        User currUser = userService.getCurrentUser(principal);
        MountainPath p = mountainPathRepository.findById(pathId).get();

        return mountainPathUserArchiveRepository.save(new MountainPathUserArchive(currUser, p, new Date(System.currentTimeMillis())));
    }
}
