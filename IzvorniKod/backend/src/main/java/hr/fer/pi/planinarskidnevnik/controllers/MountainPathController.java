package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathFindResponse;
import hr.fer.pi.planinarskidnevnik.mappers.MountainPathToMountainPathResponseMapper;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.services.MountainPathQueryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
