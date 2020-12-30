package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.exceptions.AuthorizationException;
import hr.fer.pi.planinarskidnevnik.exceptions.MountainPathDoesNotExist;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.models.MountainPathUserArchive.MountainPathUserArchive;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.repositories.MountainPathRepository;
import hr.fer.pi.planinarskidnevnik.repositories.MountainPathUserArchiveRepository;
import hr.fer.pi.planinarskidnevnik.services.MountainPathUserArchiveService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.Date;
import java.util.Optional;

@Service
public class MountainPathUserArchiveServiceImpl implements MountainPathUserArchiveService {

    private final Logger LOGGER = LoggerFactory.getLogger(MountainLodgeUserArchiveServiceImpl.class);
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
        if (principal == null) {
            throw new AuthorizationException("Pogreška prilikom autorizacije.");
        }

        LOGGER.info("Arhiviram stazu id-a: " + pathId + ", za korisnika: " + principal.getName());

        User currUser = userService.getCurrentUser(principal);
        Optional<MountainPath> p = mountainPathRepository.findById(pathId);

        if (p.isEmpty()) {
            throw new MountainPathDoesNotExist("Ne postoji planinarska staza s id-em: " + pathId);
        }

        return mountainPathUserArchiveRepository.save(new MountainPathUserArchive(currUser, p.get(), new Date(System.currentTimeMillis())));
    }
}
