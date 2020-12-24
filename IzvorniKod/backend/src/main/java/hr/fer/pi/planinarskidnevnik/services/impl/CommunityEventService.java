package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.dtos.CommunityEventDto;
import hr.fer.pi.planinarskidnevnik.dtos.UserCreateDto;
import hr.fer.pi.planinarskidnevnik.exceptions.ResourceNotFoundException;
import hr.fer.pi.planinarskidnevnik.exceptions.UserWithEmailExistsException;
import hr.fer.pi.planinarskidnevnik.models.CommunityEvent;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.repositories.CommunityEventRepository;
import hr.fer.pi.planinarskidnevnik.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommunityEventService {
    private static final Logger LOGGER = LoggerFactory.getLogger(CommunityEventService.class);
    private final CommunityEventRepository eventRepository;

    public CommunityEventService(CommunityEventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public CommunityEvent getEventById(Long eventId) {
        LOGGER.info("Fetching of user with id {}", eventId);
        Optional<CommunityEvent> optionalCommunityEvent = eventRepository.findById(eventId);
        if (optionalCommunityEvent.isEmpty()) {
            LOGGER.info("User with id {} doesn't exist", eventId);
            throw new ResourceNotFoundException("jbg");
        }
        return optionalCommunityEvent.get();
    }


    public CommunityEvent createEvent(CommunityEventDto eventCreateDto) {
        final CommunityEvent event = new CommunityEvent(eventCreateDto.getName(), eventCreateDto.getDescription(), eventCreateDto.getDateCreated(), eventCreateDto.getStartDate(), eventCreateDto.getEndDate());
        eventRepository.save(event);
        LOGGER.info("New event {} created", event);
        return event;
    }



}
