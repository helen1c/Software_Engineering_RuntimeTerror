package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeCreateRequest;
import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeSearchRequest;
import hr.fer.pi.planinarskidnevnik.exceptions.ResourceNotFoundException;
import hr.fer.pi.planinarskidnevnik.models.Hill;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import hr.fer.pi.planinarskidnevnik.models.Utility;
import hr.fer.pi.planinarskidnevnik.repositories.HillRepository;
import hr.fer.pi.planinarskidnevnik.repositories.MountainLodgeRepository;
import hr.fer.pi.planinarskidnevnik.repositories.UtilityRepository;
import hr.fer.pi.planinarskidnevnik.services.MountainLodgeQueryService;
import hr.fer.pi.planinarskidnevnik.specifications.MountainLodgeSearchSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MountainLodgeQueryServiceImpl implements MountainLodgeQueryService {


    private static final Logger LOGGER = LoggerFactory.getLogger(MountainLodgeQueryServiceImpl.class);

    private final MountainLodgeRepository mountainLodgeRepository;
    private final MountainLodgeSearchSpecification specification;
    private final HillRepository hillRepository;
    private final UtilityRepository utilityRepository;

    @Autowired
    public MountainLodgeQueryServiceImpl(MountainLodgeRepository mountainLodgeRepository,
                                         MountainLodgeSearchSpecification specification,
                                         HillRepository hillRepository,
                                         UtilityRepository utilityRepository) {
        this.mountainLodgeRepository = mountainLodgeRepository;
        this.specification = specification;
        this.hillRepository = hillRepository;
        this.utilityRepository = utilityRepository;
    }


    @Override
    public List<MountainLodge> findAllMountainLodgeBySearchCriteria(MountainLodgeSearchRequest request) {
        LOGGER.info("Find all mountain lodges when searchText equals: {} and hill id equals {}", request.getSearchText(), request.getHillId());

        List<MountainLodge> modelResponses = mountainLodgeRepository.findAll(specification.getFilter(request));
        List<MountainLodge> responses = new ArrayList<>();

        if (request.getUtilities() == null) {
            return modelResponses;
        }


        for(MountainLodge lodge : modelResponses) {
            List<java.lang.Long> ls = lodge.getUtilities().stream().map(Utility::getId).collect(Collectors.toList());

            boolean trt = true;
            for(long s : request.getUtilities()) {
                if (!ls.contains(s)) {
                    trt = false;
                    break;
                }
            }

            if (trt) {
                responses.add(lodge);
            }
        }

        return responses;
    }

    @Override
    public MountainLodge createMountainLodge(MountainLodgeCreateRequest dto) {

        LOGGER.info("Creating new mountain lodge with name: " + dto.getName());


        MountainLodge mountainLodge = new MountainLodge();
        List<Utility> utilities = utilityRepository.findAllByOrderByNameAsc();
        Hill hill = hillRepository.findById(dto.getHillId()).orElseThrow(() -> new ResourceNotFoundException("Cannot find hill with hill id "+ dto.getHillId()));

        mountainLodge.setElevation(dto.getElevation());
        mountainLodge.setImage(dto.getImage());
        mountainLodge.setName(dto.getName());
        mountainLodge.setHill(hill);
        if(dto.getUtilities() != null)
        mountainLodge.setUtilities(utilities.stream()
                                            .filter(v -> dto.getUtilities().contains(v.getId()))
                                            .collect(Collectors.toList()));

        return mountainLodgeRepository.save(mountainLodge);
    }

    @Override
    public MountainLodge deleteMountainLodge(Long lodgeId, Principal principal) {

        Optional<MountainLodge> l = mountainLodgeRepository.findById(lodgeId);
        if(l.isEmpty()) {
            throw new ResourceNotFoundException("Ne postoji planianrski dom s id-em: " + lodgeId);
        }

        mountainLodgeRepository.deleteById(lodgeId);
        return l.get();
    }


}
