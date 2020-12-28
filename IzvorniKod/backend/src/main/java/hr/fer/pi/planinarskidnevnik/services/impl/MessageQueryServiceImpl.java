package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.dtos.message.MessageCreateRequest;
import hr.fer.pi.planinarskidnevnik.models.Message;
import hr.fer.pi.planinarskidnevnik.models.MessageStatus;
import hr.fer.pi.planinarskidnevnik.repositories.MessageRepository;
import hr.fer.pi.planinarskidnevnik.services.MessageQueryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
@Service
public class MessageQueryServiceImpl implements MessageQueryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MessageQueryServiceImpl.class);

    private final MessageRepository messageRepository;
    private final UserService userService;

    @Autowired
    public MessageQueryServiceImpl(MessageRepository messageRepository, UserService userService) {
        this.messageRepository = messageRepository;
        this.userService = userService;
    }

    @Override
    public Message createMessage(MessageCreateRequest dto, Principal principal){

        Message message = new Message();
        message.setName(dto.getName());
        message.setContent(dto.getContent());
        message.setUser(userService.getCurrentUser(principal));
        message.setStatus(dto.getStatus());

        return messageRepository.save(message);
    }

    @Override
    public List<Message> getAllMessages(){
        LOGGER.info("Getting all messages.");
        return messageRepository.findAllByOrderByNameAsc();
    }

    @Override
    public Message updateStatus(Long id, MessageStatus status){
        List<Long> ids = new ArrayList<>();
        ids.add(id);
        List<Message> messages = messageRepository.findAllById(ids);
        Message message = messages.get(0);
        if(status == MessageStatus.PENDING){
            message.setStatus(MessageStatus.RESOLVED);
        }else if(status == MessageStatus.RESOLVED){
            message.setStatus(MessageStatus.PENDING);
        }


        return messageRepository.save(message);

    }

}
