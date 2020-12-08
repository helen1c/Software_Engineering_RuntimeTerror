package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathCreate;
import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathFindResponse;
import hr.fer.pi.planinarskidnevnik.mappers.MountainPathToMountainPathResponseMapper;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.services.MountainPathQueryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/mountain-paths")
public class MountainPathController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MountainPathController.class);

    private final MountainPathQueryService mountainPathQueryService;
    private final MountainPathToMountainPathResponseMapper mountainPathToMountainPathResponseMapper;

    public MountainPathController(MountainPathQueryService mountainPathQueryService, MountainPathToMountainPathResponseMapper mountainPathToMountainPathResponseMapper) {
        this.mountainPathQueryService = mountainPathQueryService;
        this.mountainPathToMountainPathResponseMapper = mountainPathToMountainPathResponseMapper;
    }

    @GetMapping("/all")
    public ResponseEntity<List<MountainPathFindResponse>> findAllMountainPathsOrderedByName() {

        List<MountainPath> modelsResponse = mountainPathQueryService.getAllMountainPaths();
        List<MountainPathFindResponse> response = mountainPathToMountainPathResponseMapper.mapToList(modelsResponse);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createMountainPath(@Valid @RequestBody final MountainPathCreate dto) {
        LOGGER.info("MountainPath creating");
        return ResponseEntity.status(HttpStatus.CREATED).body(mountainPathQueryService.createMountainPath(dto));
    }

}
