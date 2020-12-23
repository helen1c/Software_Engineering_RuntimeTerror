package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.dtos.message.MessageDto;
import hr.fer.pi.planinarskidnevnik.models.Message;
import hr.fer.pi.planinarskidnevnik.services.MessageQueryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MessageController.class);

    private final MessageQueryService messageService;

    public MessageController(MessageQueryService messageService) {
        this.messageService = messageService;
    }


    @PostMapping("/send")
    public ResponseEntity<MessageDto> newMessage(@Valid @RequestBody final MessageDto recivedMessage) {
        LOGGER.info("Creating new message with name: " + recivedMessage.getName());

        Message message = messageService.createMessage(recivedMessage);
        MessageDto messageDto = new MessageDto();
        messageDto.setName(message.getName());
        messageDto.setContent(message.getContent());

        return ResponseEntity.status(HttpStatus.CREATED).body(messageDto);
    }
}
