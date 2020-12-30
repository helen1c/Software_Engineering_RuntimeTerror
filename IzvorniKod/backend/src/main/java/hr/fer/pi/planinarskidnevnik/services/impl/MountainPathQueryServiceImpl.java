package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathCreateRequest;
import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathGradeRequest;
import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathSearchRequest;
import hr.fer.pi.planinarskidnevnik.exceptions.MountainPathAlreadyExistsException;
import hr.fer.pi.planinarskidnevnik.exceptions.ResourceNotFoundException;
import hr.fer.pi.planinarskidnevnik.mappers.MountainPathCreateRequestToMountainPathMapper;
import hr.fer.pi.planinarskidnevnik.models.Hill;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.models.MountainPathGrade;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.repositories.HillRepository;
import hr.fer.pi.planinarskidnevnik.repositories.MountainPathGradeRepository;
import hr.fer.pi.planinarskidnevnik.repositories.MountainPathRepository;
import hr.fer.pi.planinarskidnevnik.repositories.UserRepository;
import hr.fer.pi.planinarskidnevnik.services.MountainPathQueryService;
import hr.fer.pi.planinarskidnevnik.specifications.MountainPathSearchSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.Date;
import java.util.List;

@Service
public class MountainPathQueryServiceImpl implements MountainPathQueryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MountainPathQueryServiceImpl.class);

    private final MountainPathRepository mountainPathRepository;
    private final HillRepository hillRepository;
    private final UserRepository userRepository;
    private final MountainPathCreateRequestToMountainPathMapper createRequestToMountainPathMapper;
    private final MountainPathSearchSpecification specification;
    private final MountainPathGradeRepository mountainPathGradeRepository;

    @Autowired
    public MountainPathQueryServiceImpl(MountainPathRepository mountainPathRepository, HillRepository hillRepository,
                                        UserRepository userRepository, MountainPathCreateRequestToMountainPathMapper createRequestToMountainPathMapper,
                                        MountainPathSearchSpecification specification, MountainPathGradeRepository mountainPathGradeRepository){
        this.mountainPathRepository = mountainPathRepository;
        this.hillRepository = hillRepository;
        this.userRepository = userRepository;
        this.createRequestToMountainPathMapper = createRequestToMountainPathMapper;
        this.specification = specification;
        this.mountainPathGradeRepository = mountainPathGradeRepository;
    }

    @Override
    public List<MountainPath> getAllMountainPaths() {
        LOGGER.info("Getting all mountain paths.");

        return mountainPathRepository.findAllByOrderByNameAsc();
    }

    @Override
    public MountainPath createMountainPath(MountainPathCreateRequest dto, Principal principal) {
        Hill hill = hillRepository.findById(dto.getHillId()).orElseThrow(() -> new ResourceNotFoundException("Cannot find hill with hill id "+ dto.getHillId()));
        User author = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResourceNotFoundException("Cannot find user with email: " + principal.getName()));
        Date dateCreated = new Date(System.currentTimeMillis());

        if(mountainPathRepository.findByName(dto.getName()).isPresent()) {
            throw new MountainPathAlreadyExistsException("Mountain path with name: " + dto.getName() + " already exists.");
        }

        MountainPath path = createRequestToMountainPathMapper.map(dto);
        path.setAuthor(author);
        path.setHill(hill);
        path.setDateCreated(dateCreated);
        mountainPathRepository.save(path);

        LOGGER.info("New mountainPath with id {} created", path);
        return path;
    }

    @Override
    public List<MountainPath> findAllMountainPathBySearchCriteria(MountainPathSearchRequest request) {
        LOGGER.info("Find all mountain lodges when searchText equals: {} and hill id equals {}", request.getName(), request.getHillId());

        return mountainPathRepository.findAll(specification.getFilter(request));
    }

    @Override
    public MountainPathGrade gradeMountainPath(MountainPathGradeRequest gradeRequest, Principal principal) {
        User author = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResourceNotFoundException("Cannot find user with email: " + principal.getName()));
        MountainPath mountainPath = mountainPathRepository.findById(gradeRequest.getMountainPathId()).orElseThrow(() -> new ResourceNotFoundException("Cannot find mountain path with id: " + gradeRequest.getMountainPathId()));

        MountainPathGrade mountainPathGrade = new MountainPathGrade(author, mountainPath, gradeRequest.getGrade());
        return mountainPathGradeRepository.save(mountainPathGrade);
    }
}
