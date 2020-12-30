package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.services.MountainPathUserArchiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/archive-path")
public class MountainPathUserArchiveController {

    private final MountainPathUserArchiveService mountainPathUserArchiveService;

    @Autowired
    public MountainPathUserArchiveController(MountainPathUserArchiveService mountainPathUserArchiveService) {
        this.mountainPathUserArchiveService = mountainPathUserArchiveService;
    }

    @RequestMapping(value = "user/{path_id}", method = RequestMethod.PUT)
    public ResponseEntity<?> archiveMountainPath(@PathVariable("path_id") final Long pathId, Principal principal) {
        mountainPathUserArchiveService.archiveMountainPath(pathId, principal);
        return ResponseEntity.ok("Staza uspjesno arhivirana.");
    }

}
