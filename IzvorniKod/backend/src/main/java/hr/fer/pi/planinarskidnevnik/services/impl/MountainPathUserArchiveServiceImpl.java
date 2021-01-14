package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.exceptions.AuthorizationException;
import hr.fer.pi.planinarskidnevnik.exceptions.MountainPathDoesNotExist;
import hr.fer.pi.planinarskidnevnik.models.Badge;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.models.MountainPathUserArchive.MountainPathUserArchive;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.repositories.BadgeRepository;
import hr.fer.pi.planinarskidnevnik.repositories.MountainPathRepository;
import hr.fer.pi.planinarskidnevnik.repositories.MountainPathUserArchiveRepository;
import hr.fer.pi.planinarskidnevnik.services.MountainPathUserArchiveService;
import hr.fer.pi.planinarskidnevnik.services.UserBadgeService;
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
    private final BadgeRepository badgeRepository;
    private final UserBadgeService userBadgeService;

    public MountainPathUserArchiveServiceImpl(UserService userService, MountainPathUserArchiveRepository mountainPathUserArchiveRepository, MountainPathRepository mountainPathRepository, BadgeRepository badgeRepository, UserBadgeService userBadgeService) {
        this.userService = userService;
        this.mountainPathUserArchiveRepository = mountainPathUserArchiveRepository;
        this.mountainPathRepository = mountainPathRepository;
        this.badgeRepository = badgeRepository;
        this.userBadgeService = userBadgeService;
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

        var v = mountainPathUserArchiveRepository.save(new MountainPathUserArchive(currUser, p.get(), new Date(System.currentTimeMillis())));
        var archPaths = currUser.getMountainPathUserArchive();
        if(archPaths.size() == 1) {
            Badge b = badgeRepository.getBadgeByNameEquals("path_bronze").get();
            userBadgeService.addBadgeToUser(b, currUser);
        } else if(archPaths.size() == 5) {
            Badge b = badgeRepository.getBadgeByNameEquals("path_silver").get();
            userBadgeService.addBadgeToUser(b, currUser);
        } else if(archPaths.size() == 10) {
            Badge b = badgeRepository.getBadgeByNameEquals("path_gold").get();
            userBadgeService.addBadgeToUser(b, currUser);
        }

        return v;
    }
}
