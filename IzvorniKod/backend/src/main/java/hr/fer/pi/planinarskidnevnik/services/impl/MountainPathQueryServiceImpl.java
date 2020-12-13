package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathCreateRequest;
import hr.fer.pi.planinarskidnevnik.exceptions.ResourceNotFoundException;
import hr.fer.pi.planinarskidnevnik.models.Hill;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.repositories.HillRepository;
import hr.fer.pi.planinarskidnevnik.repositories.MountainPathRepository;
import hr.fer.pi.planinarskidnevnik.repositories.UserRepository;
import hr.fer.pi.planinarskidnevnik.services.MountainPathQueryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MountainPathQueryServiceImpl implements MountainPathQueryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MountainPathQueryServiceImpl.class);

    private final MountainPathRepository mountainPathRepository;

    private final HillRepository hillRepository;

    private final UserRepository userRepository;

    @Autowired
    public MountainPathQueryServiceImpl(MountainPathRepository mountainPathRepository, HillRepository hillRepository, UserRepository userRepository){
        this.mountainPathRepository = mountainPathRepository;
        this.hillRepository = hillRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<MountainPath> getAllMountainPaths() {
        LOGGER.info("Getting all mountain paths.");

        return mountainPathRepository.findAllByOrderByNameAsc();
    }

    @Override
    public MountainPath createMountainPath(MountainPathCreateRequest dto) {
        Hill hill = hillRepository.findById(dto.getHillId()).orElseThrow(() -> new ResourceNotFoundException("Cannot find hill with hill id "+ dto.getHillId()));
        User author = userRepository.findById(dto.getAuthorId()).orElseThrow(() -> new ResourceNotFoundException("Cannot find user with user id "+ dto.getAuthorId()));

        final MountainPath mountainPath = new MountainPath(hill, dto.getName(), dto.getStartPoint(), dto.getEndPoint(),
        dto.getAvgWalkTime(), dto.getLength(), dto.getSeaLevelDiff(), dto.getDateCreated(), dto.isPrivate(), author);
        mountainPathRepository.save(mountainPath);

        LOGGER.info("New mountainPath {} created", mountainPath);
        return mountainPath;
    }
}
