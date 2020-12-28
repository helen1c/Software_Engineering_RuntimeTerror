package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.services.MountainLodgeUserArchiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/archive-lodge")
public class MountainLodgeUserArchiveController {

    private final MountainLodgeUserArchiveService mountainLodgeUserArchiveService;

    @Autowired
    public MountainLodgeUserArchiveController(MountainLodgeUserArchiveService mountainLodgeUserArchiveService) {
        this.mountainLodgeUserArchiveService = mountainLodgeUserArchiveService;
    }

    @RequestMapping(value = "user/{lodge_id}", method = RequestMethod.PUT)
    public ResponseEntity<?> archiveMountainLodge(@PathVariable("lodge_id") final Long lodgeId, Principal principal) {
        mountainLodgeUserArchiveService.archiveMountainLodge(lodgeId, principal);
        return ResponseEntity.ok("Dom uspjesno spremljen.");
    }

}
