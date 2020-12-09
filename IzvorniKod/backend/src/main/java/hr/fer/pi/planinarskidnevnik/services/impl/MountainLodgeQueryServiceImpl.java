package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeSearchRequest;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import hr.fer.pi.planinarskidnevnik.models.Utility;
import hr.fer.pi.planinarskidnevnik.repositories.MountainLodgeRepository;
import hr.fer.pi.planinarskidnevnik.services.MountainLodgeQueryService;
import hr.fer.pi.planinarskidnevnik.specifications.MountainLodgeSearchSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MountainLodgeQueryServiceImpl implements MountainLodgeQueryService {


    private static final Logger LOGGER = LoggerFactory.getLogger(MountainLodgeQueryServiceImpl.class);

    private final MountainLodgeRepository repo;
    private final MountainLodgeSearchSpecification specification;

    @Autowired
    public MountainLodgeQueryServiceImpl(MountainLodgeRepository repo, MountainLodgeSearchSpecification specification) {
        this.repo = repo;
        this.specification = specification;
    }

    @Override
    public List<MountainLodge> findAllMountainLodgeBySearchCriteria(MountainLodgeSearchRequest request) {
        LOGGER.info("Find all mountain lodges when searchText equals: {} and hill id equals {}", request.getSearchText(), request.getHillId());

        List<MountainLodge> modelResponses = repo.findAll(specification.getFilter(request));
        List<MountainLodge> responses = new ArrayList<>();

        if (request.getUtilities() == null) {
            return modelResponses;
        }


        for(MountainLodge lodge : modelResponses) {
            List<Long> ls = lodge.getUtilities().stream().map(Utility::getId).collect(Collectors.toList());

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

}
