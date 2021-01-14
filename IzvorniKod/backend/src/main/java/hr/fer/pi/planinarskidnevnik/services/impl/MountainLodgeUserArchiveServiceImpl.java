package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.exceptions.AuthorizationException;
import hr.fer.pi.planinarskidnevnik.exceptions.MountainLodgeDoesNotExist;
import hr.fer.pi.planinarskidnevnik.models.Badge;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import hr.fer.pi.planinarskidnevnik.models.MountainLodgeUserArchive.MountainLodgeUserArchive;
import hr.fer.pi.planinarskidnevnik.models.MountainPathUserArchive.MountainPathUserArchive;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.repositories.BadgeRepository;
import hr.fer.pi.planinarskidnevnik.repositories.MountainLodgeRepository;
import hr.fer.pi.planinarskidnevnik.repositories.MountainLodgeUserArchiveRepository;
import hr.fer.pi.planinarskidnevnik.services.MountainLodgeUserArchiveService;
import hr.fer.pi.planinarskidnevnik.services.UserBadgeService;
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
    private final BadgeRepository badgeRepository;
    private final UserBadgeService userBadgeService;


    @Autowired
    public MountainLodgeUserArchiveServiceImpl(MountainLodgeUserArchiveRepository lodgeUserArchiveRepository, MountainLodgeRepository mountainLodgeRepository, UserService userService, BadgeRepository badgeRepository, UserBadgeService userBadgeService) {
        this.lodgeUserArchiveRepository = lodgeUserArchiveRepository;
        this.mountainLodgeRepository = mountainLodgeRepository;
        this.userService = userService;
        this.badgeRepository = badgeRepository;
        this.userBadgeService = userBadgeService;
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
        var v = lodgeUserArchiveRepository.save(archive);
        var archPaths = user.getMountainLodgeUserArchive();
        if(archPaths.size() == 1) {
            Badge b = badgeRepository.getBadgeByNameEquals("lodge_bronze").get();
            userBadgeService.addBadgeToUser(b, user);
        } else if(archPaths.size() == 5) {
            Badge b = badgeRepository.getBadgeByNameEquals("lodge_silver").get();
            userBadgeService.addBadgeToUser(b, user);
        } else if(archPaths.size() == 10) {
            Badge b = badgeRepository.getBadgeByNameEquals("lodge_gold").get();
            userBadgeService.addBadgeToUser(b, user);
        }
        return v;
    }
}
