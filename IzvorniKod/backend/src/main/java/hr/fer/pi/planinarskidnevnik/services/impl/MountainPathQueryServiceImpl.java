package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathCreate;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.repositories.MountainPathRepository;
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

    @Autowired
    public MountainPathQueryServiceImpl(MountainPathRepository mountainPathRepository){
        this.mountainPathRepository = mountainPathRepository;
    }

    @Override
    public List<MountainPath> getAllMountainPaths() {
        LOGGER.info("Getting all mountain paths.");

        return mountainPathRepository.findAllByOrderByNameAsc();
    }

    @Override
    public MountainPath createMountainPath(MountainPathCreate dto) {

        final MountainPath mountainPath = new MountainPath(dto.getHill(), dto.getName(), dto.getStartPoint(), dto.getEndPoint(),
        dto.getAvgWalkTime(), dto.getLength(), dto.getSeaLevelDiff(), dto.getDateCreated(), dto.isPrivate(), dto.getAuthor());
        mountainPathRepository.save(mountainPath);

        LOGGER.info("New mountainPath {} created", mountainPath);
        return mountainPath;
    }
}
