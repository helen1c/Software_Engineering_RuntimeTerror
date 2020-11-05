package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.dtos.MountainLodgeSearchRequest;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import hr.fer.pi.planinarskidnevnik.services.MountainLodgeQueryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/mountain-lodges")
public class MountainLodgeController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MountainLodgeController.class);

    private final MountainLodgeQueryService service;

    @Autowired
    public MountainLodgeController(MountainLodgeQueryService service) {
        this.service = service;
    }

    @PostMapping("/search")
    public ResponseEntity<Page<MountainLodge>> mountainLodgeSearch(@RequestBody @Valid MountainLodgeSearchRequest request) {
        LOGGER.info(request.getSearchText());
        Page<MountainLodge> res = service.findAllMountainLodgeBySearchCriteria(request);

        return ResponseEntity.ok(res);

    }

    @GetMapping("/all")
    public ResponseEntity<List<MountainLodge>> findAll() {
        return ResponseEntity.ok(service.findAllLodges());
    }



}
