package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.dtos.message.MessageCreateRequest;
import hr.fer.pi.planinarskidnevnik.dtos.message.MessageFindResponse;
import hr.fer.pi.planinarskidnevnik.mappers.MessageToMessageResponseMapper;
import hr.fer.pi.planinarskidnevnik.models.Message;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.services.MessageQueryService;
import hr.fer.pi.planinarskidnevnik.services.impl.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MessageController.class);

    private final MessageQueryService messageService;
    private final UserService userService;
    private final MessageToMessageResponseMapper messageResponseMapper;

    public MessageController(MessageQueryService messageService, UserService userService, MessageToMessageResponseMapper messageResponseMapper) {
        this.messageService = messageService;
        this.userService = userService;
        this.messageResponseMapper = messageResponseMapper;
    }


    @PostMapping("/send")
    public ResponseEntity<MessageCreateRequest> newMessage(@Valid @RequestBody final MessageCreateRequest recivedMessage,Principal principal) {
        LOGGER.info("Creating new message with name: " + recivedMessage.getName());

        Message message = messageService.createMessage(recivedMessage,principal);
        MessageCreateRequest messageDto = new MessageCreateRequest();
        messageDto.setName(message.getName());
        messageDto.setContent(message.getContent());

        return ResponseEntity.status(HttpStatus.CREATED).body(messageDto);
    }

    @GetMapping("/all")
    public ResponseEntity<List<MessageFindResponse>> findAllMessages() {

        List<Message> modelsResponse = messageService.getAllMessages();
        List<MessageFindResponse> response = messageResponseMapper.mapToList(modelsResponse);

        return ResponseEntity.ok(response);
    }
}
