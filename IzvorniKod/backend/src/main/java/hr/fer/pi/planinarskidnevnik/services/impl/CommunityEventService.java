package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.dtos.CommunityEvent.*;
import hr.fer.pi.planinarskidnevnik.dtos.User.UserSearchDto;
import hr.fer.pi.planinarskidnevnik.exceptions.ResourceNotFoundException;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.models.UserEvent.CommunityEventMountainPath;
import hr.fer.pi.planinarskidnevnik.repositories.CommunityEventMountainPathRepository;
import hr.fer.pi.planinarskidnevnik.repositories.CommunityEventRepository;
import hr.fer.pi.planinarskidnevnik.models.CommunityEvent;
import hr.fer.pi.planinarskidnevnik.repositories.MountainPathRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommunityEventService {
    private static final Logger LOGGER = LoggerFactory.getLogger(CommunityEventService.class);
    private final CommunityEventRepository eventRepository;
    private final UserService userService;
    private final MountainPathQueryServiceImpl mountainPathQueryService;
    private final MountainPathRepository mountainPathRepository;
    private final CommunityEventMountainPathRepository communityEventMountainPathRepository;

    private static final int ONE_DAY = 24*60*60*1000;

    public CommunityEventService(CommunityEventRepository eventRepository, UserService userService, MountainPathQueryServiceImpl mountainPathQueryService, MountainPathRepository mountainPathRepository, CommunityEventMountainPathRepository communityEventMountainPathRepository) {
        this.eventRepository = eventRepository;
        this.userService = userService;
        this.mountainPathQueryService = mountainPathQueryService;
        this.mountainPathRepository = mountainPathRepository;
        this.communityEventMountainPathRepository = communityEventMountainPathRepository;
    }


    public CommunityEvent getEventById(Long eventId) {
        LOGGER.info("Fetching event with id {}", eventId);
        Optional<CommunityEvent> optionalCommunityEvent = eventRepository.findById(eventId);
        if (optionalCommunityEvent.isEmpty()) {
            LOGGER.info("Event with id {} doesn't exist", eventId);
            throw new ResourceNotFoundException("Događaj nije pronađen.");
        }
        return optionalCommunityEvent.get();
    }


    public CommunityEvent createEvent(CommunityEventDto eventCreateDto, Principal principal) {
        final CommunityEvent event = new CommunityEvent();
        event.setName(eventCreateDto.getName());
        event.setDescription(eventCreateDto.getDescription());
        event.setDateCreated(eventCreateDto.getDateCreated());
        event.setStartDate(eventCreateDto.getStartDate());
        event.setEndDate(eventCreateDto.getEndDate());
        event.setDateCreated(new Date(System.currentTimeMillis()));
        event.setUser(userService.getCurrentUser(principal));
        CommunityEvent evRet = eventRepository.save(event);
        for (PathDateIdDto path: eventCreateDto.getPaths()) {
            communityEventMountainPathRepository.save(new CommunityEventMountainPath(event, mountainPathRepository.findById(path.getPathId()).get(), path.getDate()));
        }
        LOGGER.info("New event {} created", event);
        return event;
    }

    public List<PreviewCommunityEventDto> getMyCommunityEvents(Principal principal) {

        User curUser = userService.getCurrentUser(principal);

        List<CommunityEvent> events = new ArrayList<>(eventRepository.findAllByUser_IdAndStartDateIsAfterOrderByStartDateDesc(
                curUser.getId(),
                new Date(System.currentTimeMillis() - ONE_DAY)));
        List<User> friends = curUser.getFriends();
        for(User user : friends) {
            events.addAll(eventRepository.findAllByUser_IdAndStartDateIsAfterOrderByStartDateDesc(user.getId(),
                    new Date(System.currentTimeMillis() - ONE_DAY)));
        }

        return mapToCommunityEvents(events);
    }

    private List<PreviewCommunityEventDto> mapToCommunityEvents(List<CommunityEvent> events) {

        List<PreviewCommunityEventDto> communityEventDtos = new ArrayList<>();
        for(CommunityEvent event : events) {

            PreviewCommunityEventDto communityEventDto = new PreviewCommunityEventDto();
            User user = event.getUser();
            List<CommunityEventMountainPath> communityEventMountainPathList = event.getPaths();
            List<MountainPathOnDateDtoResponse> pathDates = new ArrayList<>();

            for (CommunityEventMountainPath path : communityEventMountainPathList) {
                pathDates.add(getMountainPathOnSpecificDateResponse(path));
            }

            communityEventDto.setName(event.getName());
            communityEventDto.setUser(new UserSearchDto(user.getId(), userService.getImage(user.getEmail()), user.getName()));//userService.getImage(user.getEmail())
            communityEventDto.setDescription(event.getDescription());
            communityEventDto.setDate_created(event.getDateCreated());
            communityEventDto.setEnd_date(event.getEndDate());
            communityEventDto.setStart_date(event.getStartDate());
            communityEventDto.setPaths(pathDates);

            List<ParticipantDto> participantDtos = new ArrayList<>();
            List<User> particiUsers = event.getParticipants();
            for(User u : particiUsers) {
                ParticipantDto participantDto = new ParticipantDto();
                participantDto.setUserId(u.getId());
                participantDto.setName(u.getName());
            }
            communityEventDtos.add(communityEventDto);

        }
        return communityEventDtos;

    }

    private MountainPathOnDateDtoResponse getMountainPathOnSpecificDateResponse(CommunityEventMountainPath path) {

        MountainPathOnDateDtoResponse response = new MountainPathOnDateDtoResponse();
        MountainPath p = path.getPath();
        response.setId(p.getId());
        response.setHillName(p.getHill().getName());
        response.setDateTraveled(path.getDateArchived());
        response.setDifficulty(p.getDifficulty());
        response.setLength(p.getLength());
        response.setStartPoint(p.getStartPoint());
        response.setEndPoint(p.getEndPoint());
        response.setName(p.getName());

        return response;

    }

}
