package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeSearchRequest;
import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeSearchResponse;
import hr.fer.pi.planinarskidnevnik.mappers.MountainLodgeToMountainLodgeSearchResponseMapper;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import hr.fer.pi.planinarskidnevnik.services.MountainLodgeQueryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/mountain-lodges")
public class MountainLodgeController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MountainLodgeController.class);

    private final MountainLodgeQueryService service;
    private final MountainLodgeToMountainLodgeSearchResponseMapper mountainLodgeMapper;

    @Autowired
    public MountainLodgeController(MountainLodgeQueryService service, MountainLodgeToMountainLodgeSearchResponseMapper mountainLodgeToMountainLodgeSearchResponseMapper) {
        this.service = service;
        this.mountainLodgeMapper = mountainLodgeToMountainLodgeSearchResponseMapper;
    }

    @PostMapping("/search")
    public ResponseEntity<Page<MountainLodgeSearchResponse>> mountainLodgeSearch(@RequestBody @Valid MountainLodgeSearchRequest request) {
        LOGGER.info(request.getSearchText());
        Page<MountainLodgeSearchResponse> responses = service.findAllMountainLodgeBySearchCriteria(request).map(mountainLodgeMapper::map);


        return ResponseEntity.ok(responses);
    }

}
