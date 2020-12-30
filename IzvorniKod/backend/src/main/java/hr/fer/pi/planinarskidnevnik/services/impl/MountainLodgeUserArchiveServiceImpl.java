package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.exceptions.AuthorizationException;
import hr.fer.pi.planinarskidnevnik.exceptions.MountainLodgeDoesNotExist;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import hr.fer.pi.planinarskidnevnik.models.MountainLodgeUserArchive.MountainLodgeUserArchive;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.repositories.MountainLodgeRepository;
import hr.fer.pi.planinarskidnevnik.repositories.MountainLodgeUserArchiveRepository;
import hr.fer.pi.planinarskidnevnik.services.MountainLodgeUserArchiveService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.Date;
import java.util.Optional;

@Service
public class MountainLodgeUserArchiveServiceImpl implements MountainLodgeUserArchiveService {

    private final Logger LOGGER = LoggerFactory.getLogger(MountainLodgeUserArchiveServiceImpl.class);
    private final MountainLodgeUserArchiveRepository lodgeUserArchiveRepository;
    private final MountainLodgeRepository mountainLodgeRepository;
    private final UserService userService;

    @Autowired
    public MountainLodgeUserArchiveServiceImpl(MountainLodgeUserArchiveRepository lodgeUserArchiveRepository, MountainLodgeRepository mountainLodgeRepository, UserService userService) {
        this.lodgeUserArchiveRepository = lodgeUserArchiveRepository;
        this.mountainLodgeRepository = mountainLodgeRepository;
        this.userService = userService;
    }


    @Override
    public MountainLodgeUserArchive archiveMountainLodge(Long lodgeId, Principal principal) {

        if (principal == null) {
            throw new AuthorizationException("Pogreška prilikom autorizacije.");
        }

        LOGGER.info("Archive lodge with id: " + lodgeId + ", and user: " + principal.getName());

        User user = userService.getCurrentUser(principal);
        Optional<MountainLodge> lodge = mountainLodgeRepository.findById(lodgeId);

        if (lodge.isEmpty()) {
            throw new MountainLodgeDoesNotExist("Planinarski dom s id-em: " + lodgeId + " ne postoji.");
        }

        MountainLodgeUserArchive archive = new MountainLodgeUserArchive(user, lodge.get(), new Date(System.currentTimeMillis()));
        return lodgeUserArchiveRepository.save(archive);
    }
}
