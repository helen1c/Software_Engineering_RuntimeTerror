package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeCreateRequest;
import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeCreateResponse;
import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeSearchRequest;
import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeSearchResponse;
import hr.fer.pi.planinarskidnevnik.mappers.MountainLodgeToMountainLodgeSearchResponseMapper;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import hr.fer.pi.planinarskidnevnik.services.MountainLodgeQueryService;
import hr.fer.pi.planinarskidnevnik.services.impl.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/mountain-lodges")
public class MountainLodgeController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MountainLodgeController.class);

    private final UserService userService;
    private final MountainLodgeQueryService service;
    private final MountainLodgeToMountainLodgeSearchResponseMapper mountainLodgeMapper;


    @Autowired
    public MountainLodgeController(UserService userService, MountainLodgeQueryService service, MountainLodgeToMountainLodgeSearchResponseMapper mountainLodgeToMountainLodgeSearchResponseMapper) {
        this.userService = userService;
        this.service = service;
        this.mountainLodgeMapper = mountainLodgeToMountainLodgeSearchResponseMapper;
    }

    @PostMapping("/search")
    public ResponseEntity<List<MountainLodgeSearchResponse>> mountainLodgeSearch(@RequestBody @Valid MountainLodgeSearchRequest request) {
        LOGGER.info(request.getSearchText());
        List<MountainLodgeSearchResponse> responses = mountainLodgeMapper.mapToList(service.findAllMountainLodgeBySearchCriteria(request));

        return ResponseEntity.ok(responses);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createMountainLodge(@Valid @RequestBody final MountainLodgeCreateRequest createRequest, Principal principal) {
        LOGGER.info("Creating new Mountain Lodge with name: " + createRequest.getName());
        if(principal == null || !userService.getRole(principal.getName()).equals("ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nemate ovlasti.");
        }

        MountainLodge ml = service.createMountainLodge(createRequest);
        MountainLodgeCreateResponse response = new MountainLodgeCreateResponse();

        response.setName(ml.getName());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/delete/{lodge_id}")
    public ResponseEntity<?> deleteMountainLodge(@PathVariable("lodge_id") Long lodgeId, Principal principal) {
        if(principal == null || !userService.getRole(principal.getName()).equals("ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nemate ovlasti.");
        }
        MountainLodge lodge = service.deleteMountainLodge(lodgeId, principal);

        return ResponseEntity.ok("Planinarski dom: " + lodge.getName() + " je uspješno obrisan.");
    }

}
