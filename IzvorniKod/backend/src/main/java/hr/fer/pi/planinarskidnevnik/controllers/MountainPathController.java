package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathCreateRequest;
import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathCreateResponse;
import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathFindResponse;
import hr.fer.pi.planinarskidnevnik.exceptions.MountainPathAlreadyExistsException;
import hr.fer.pi.planinarskidnevnik.mappers.MountainPathToMountainPathResponseMapper;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.services.MountainPathQueryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/mountain-paths")
public class MountainPathController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MountainPathController.class);

    private final MountainPathQueryService service;
    private final MountainPathToMountainPathResponseMapper mountainPathToMountainPathResponseMapper;

    public MountainPathController(MountainPathQueryService service, MountainPathToMountainPathResponseMapper mountainPathToMountainPathResponseMapper) {
        this.service = service;
        this.mountainPathToMountainPathResponseMapper = mountainPathToMountainPathResponseMapper;
    }

    @GetMapping("/all")
    public ResponseEntity<List<MountainPathFindResponse>> findAllMountainPathsOrderedByName() {

        List<MountainPath> modelsResponse = service.getAllMountainPaths();
        List<MountainPathFindResponse> response = mountainPathToMountainPathResponseMapper.mapToList(modelsResponse);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createMountainPath(@Valid @RequestBody final MountainPathCreateRequest createRequest, Principal principal) {
        LOGGER.info("Creating new Mountain Path with name: " + createRequest.getName());

        MountainPath mp = service.createMountainPath(createRequest, principal);
        MountainPathCreateResponse response = new MountainPathCreateResponse();

        response.setName(mp.getName());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
