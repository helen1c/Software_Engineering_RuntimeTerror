package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.dtos.CommunityEvent.*;
import hr.fer.pi.planinarskidnevnik.dtos.User.UserSearchDto;
import hr.fer.pi.planinarskidnevnik.exceptions.EventAttendanceException;
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
import java.util.stream.Collectors;

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

    public List<PreviewCommunityEventDto> getArchivedAuthoredEvents(Principal principal) {
        User curUser = userService.getCurrentUser(principal);
        List<CommunityEvent> events = new ArrayList<>(eventRepository.findAllByUser_IdOrderByStartDate(curUser.getId()));
        return mapToCommunityEvents(events);
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

            communityEventDto.setId(event.getId());
            communityEventDto.setName(event.getName());
            communityEventDto.setUser(new UserSearchDto(user.getId(), null, user.getName()));//userService.getImage(user.getEmail())
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
                participantDtos.add(participantDto);
            }
            communityEventDto.setParticipants(participantDtos);
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

    public EventAttendanceParticipatingResponse particiapteOnEvent(Long eventId, Principal principal) {

        CommunityEvent event = eventRepository.findById(eventId).get();
        User curUser = userService.getCurrentUser(principal);

        List<Long> friends = event.getUser().getFriends().stream().map(User::getId).collect(Collectors.toList());

        if(!(friends.contains(curUser.getId()) || curUser.getId().equals(event.getUser().getId()))) {
            throw new EventAttendanceException("Ovaj događaj nije na listi prijatelja vaše planinarske zajednice pa se ne možete prijaviti na njega.");
        }

        if(event.getStartDate().getTime() < System.currentTimeMillis() - ONE_DAY) {
            throw new EventAttendanceException("Ne možete se prijaviti na događaj jer je već započeo.");
        }

        List<User> participUsers = event.getParticipants();
        for(User u : participUsers) {
            if(curUser.getId().equals(u.getId())) {
                throw new EventAttendanceException("Već sudjelujete u događaju: " + event.getName());
            }
        }

        event.getParticipants().add(curUser);
        eventRepository.save(event);

        EventAttendanceParticipatingResponse response = new EventAttendanceParticipatingResponse();
        response.setMessage("Korisnik " + curUser.getName() + " se uspješno prijavio za sudjelovanje na događaju: " + event.getName());
        response.setUserId(curUser.getId());
        response.setEventId(event.getId());
        response.setName(curUser.getName());

        return response;
    }

    public EventAttendanceParticipatingResponse deParticiapteOnEvent(Long eventId, Principal principal) {

        CommunityEvent event = eventRepository.findById(eventId).get();
        User curUser = userService.getCurrentUser(principal);

        List<User> participUsers = event.getParticipants();

        List<Long> ids = participUsers.stream().map(User::getId).collect(Collectors.toList());
        if(!ids.contains(curUser.getId())) {
            throw new EventAttendanceException("Niste prijavljeni za dolazak na ovaj događaj pa se ne možete odjaviti.");
        }
        event.getParticipants().removeIf(v -> v.getId().equals(curUser.getId()));
        eventRepository.save(event);

        EventAttendanceParticipatingResponse response = new EventAttendanceParticipatingResponse();
        response.setMessage("Korisnik " + curUser.getName() + " se uspješno odjavio sa sudjelovanja na događaju: " + event.getName());
        response.setUserId(curUser.getId());
        response.setEventId(event.getId());
        response.setName(curUser.getName());

        return response;
    }

}
