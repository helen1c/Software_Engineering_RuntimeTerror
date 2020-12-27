package hr.fer.pi.planinarskidnevnik.mappers;

import hr.fer.pi.planinarskidnevnik.dtos.message.MessageFindResponse;
import hr.fer.pi.planinarskidnevnik.models.Message;
import hr.fer.pi.planinarskidnevnik.util.mapper.DefaultMapper;
import org.springframework.stereotype.Component;

@Component
public class MessageToMessageResponseMapper implements DefaultMapper<Message, MessageFindResponse> {
    @Override
    public MessageFindResponse map(Message from){
        MessageFindResponse response = new MessageFindResponse();
        response.setId(from.getId());
        response.setName(from.getName());
        response.setContent(from.getContent());
        response.setUserName(from.getUser().getName());
        response.setUserId(from.getUser().getId());

        return response;
    }
}
