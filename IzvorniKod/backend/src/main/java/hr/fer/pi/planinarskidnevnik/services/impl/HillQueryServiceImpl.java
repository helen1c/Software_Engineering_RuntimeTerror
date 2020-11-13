package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.models.Hill;
import hr.fer.pi.planinarskidnevnik.repositories.HillRepository;
import hr.fer.pi.planinarskidnevnik.services.HillQueryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HillQueryServiceImpl implements HillQueryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(HillQueryServiceImpl.class);

    private final HillRepository hillRepository;

    @Autowired
    public HillQueryServiceImpl(HillRepository hillRepository) {
        this.hillRepository = hillRepository;
    }

    @Override
    public List<Hill> getAllHills() {
        LOGGER.info("Getting all hills.");

        return hillRepository.findAllByOrderByNameAsc();
    }
}
