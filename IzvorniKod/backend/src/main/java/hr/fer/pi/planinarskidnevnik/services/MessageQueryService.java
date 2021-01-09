package hr.fer.pi.planinarskidnevnik.services;

import hr.fer.pi.planinarskidnevnik.dtos.message.MessageCreateRequest;
import hr.fer.pi.planinarskidnevnik.models.Message;
import hr.fer.pi.planinarskidnevnik.models.MessageStatus;

import java.security.Principal;
import java.util.List;


public interface MessageQueryService {

    List<Message> getAllMessages();
    Message createMessage(MessageCreateRequest dto, Principal principal);
    public Message updateStatus(Long id, MessageStatus status);
}
