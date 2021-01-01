package hr.fer.pi.planinarskidnevnik.controllers;


import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.*;
import hr.fer.pi.planinarskidnevnik.mappers.MountainPathToMountainPathResponseMapper;
import hr.fer.pi.planinarskidnevnik.mappers.MountainPathToMountainPathSearchResponseMapper;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.models.MountainPathGrade;
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
    private final MountainPathToMountainPathSearchResponseMapper mountainPathToMountainPathSearchResponseMapper;

    public MountainPathController(MountainPathQueryService service,
                                  MountainPathToMountainPathResponseMapper mountainPathToMountainPathResponseMapper,
                                  MountainPathToMountainPathSearchResponseMapper mountainPathToMountainPathSearchResponseMapper) {
        this.service = service;
        this.mountainPathToMountainPathSearchResponseMapper = mountainPathToMountainPathSearchResponseMapper;
    }

    @GetMapping("/{id}")
    public ResponseEntity<MountainPathSearchResponse> findMountainPathById(@PathVariable("id") final Long id) {
        MountainPath mountainPath = service.getMountainPathById(id);
        return ResponseEntity.ok(mountainPathToMountainPathSearchResponseMapper.map(mountainPath));
    }

    @GetMapping("/all")
    public ResponseEntity<List<MountainPathSearchResponse>> findAllMountainPathsOrderedByName() {

        List<MountainPath> modelsResponse = service.getAllMountainPaths();
        List<MountainPathSearchResponse> response = mountainPathToMountainPathSearchResponseMapper.mapToList(modelsResponse);

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

    @PostMapping("/search")
    public ResponseEntity<List<MountainPathSearchResponse>> mountainLodgeSearch(@RequestBody @Valid MountainPathSearchRequest request) {
        LOGGER.info(request.getName());
        List<MountainPathSearchResponse> responses = mountainPathToMountainPathSearchResponseMapper.mapToList(service.findAllMountainPathBySearchCriteria(request));

        return ResponseEntity.ok(responses);
    }

    @PostMapping("/grade")
    public ResponseEntity<?> gradeMountainPath(@Valid @RequestBody final MountainPathGradeRequest gradeRequest, Principal principal) {
        LOGGER.info("Grading Mountain Path with ID: " + gradeRequest.getMountainPathId());
        MountainPathGrade mountainPathGrade = service.gradeMountainPath(gradeRequest, principal);

        MountainPathGradeResponse response = new MountainPathGradeResponse();
        response.setMountainPathId(mountainPathGrade.getPath().getId());
        response.setGrade(mountainPathGrade.getGrade());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
