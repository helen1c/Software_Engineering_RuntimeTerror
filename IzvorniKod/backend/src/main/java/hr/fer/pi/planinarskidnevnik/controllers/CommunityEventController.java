package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.dtos.CommunityEventDto;
import hr.fer.pi.planinarskidnevnik.dtos.UserCreateDto;
import hr.fer.pi.planinarskidnevnik.models.CommunityEvent;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.services.impl.CommunityEventService;
import hr.fer.pi.planinarskidnevnik.services.impl.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("event")
public class CommunityEventController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private final CommunityEventService eventService;

    public CommunityEventController(CommunityEventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getEventById(@PathVariable("id") final Long eventId) {
        LOGGER.info("User fetching");
        final CommunityEvent communityEvent = eventService.getEventById(eventId);
        return ResponseEntity.ok(communityEvent);
    }

    @PostMapping
    public ResponseEntity<?> createEvent(@Valid @RequestBody final CommunityEventDto dto) {
        LOGGER.info("Event creating");
        return ResponseEntity.status(HttpStatus.CREATED).body(eventService.createEvent(dto));
    }

}