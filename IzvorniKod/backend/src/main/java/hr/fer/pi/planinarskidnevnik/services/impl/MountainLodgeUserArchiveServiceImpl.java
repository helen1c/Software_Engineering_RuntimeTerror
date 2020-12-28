package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import hr.fer.pi.planinarskidnevnik.models.MountainLodgeUserArchive;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.repositories.MountainLodgeRepository;
import hr.fer.pi.planinarskidnevnik.repositories.MountainLodgeUserArchiveRepository;
import hr.fer.pi.planinarskidnevnik.services.MountainLodgeUserArchiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.Date;
import java.util.List;

@Service
public class MountainLodgeUserArchiveServiceImpl implements MountainLodgeUserArchiveService {

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

        User user = userService.getCurrentUser(principal);
        MountainLodge lodge = mountainLodgeRepository.findById(lodgeId).get();

        MountainLodgeUserArchive archive = new MountainLodgeUserArchive(user, lodge, new Date(System.currentTimeMillis()));
        return lodgeUserArchiveRepository.save(archive);
    }

    @Override
    public List<MountainLodgeUserArchive> getAllForUser(Principal principal) {
        return lodgeUserArchiveRepository.findByUser_Id(userService.getCurrentUser(principal).getId());
    }


}
