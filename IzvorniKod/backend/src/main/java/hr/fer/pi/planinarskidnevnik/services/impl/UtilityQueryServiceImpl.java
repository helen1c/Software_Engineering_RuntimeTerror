package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.models.Utility;
import hr.fer.pi.planinarskidnevnik.repositories.UtilityRepository;
import hr.fer.pi.planinarskidnevnik.services.UtilityQueryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtilityQueryServiceImpl implements UtilityQueryService {

    UtilityRepository repo;
    public static final Logger LOGGER = LoggerFactory.getLogger(UtilityQueryServiceImpl.class);

    @Autowired
    public UtilityQueryServiceImpl(UtilityRepository repo) {
        this.repo = repo;
    }


    @Override
    public List<Utility> getAllUtilities() {
        LOGGER.info("Finding all utilities order by name ascending...");

        return repo.findAllByOrderByNameAsc();
    }
}
