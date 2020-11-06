package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeSearchRequest;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import hr.fer.pi.planinarskidnevnik.repositories.MountainLodgeRepository;
import hr.fer.pi.planinarskidnevnik.services.MountainLodgeQueryService;
import hr.fer.pi.planinarskidnevnik.specifications.MountainLodgeSearchSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
    public Page<MountainLodge> findAllMountainLodgeBySearchCriteria(MountainLodgeSearchRequest request) {
        LOGGER.info("Find all mountain lodges when searchText equals: {} and hill id equals {}", request.getSearchText(), request.getHillId());

        Pageable pageable = request.toPageRequest();
        return repo.findAll(specification.getFilter(request), pageable);
    }

}
