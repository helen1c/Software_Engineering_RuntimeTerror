package hr.fer.pi.planinarskidnevnik.mappers;

import hr.fer.pi.planinarskidnevnik.dtos.Hill.HillFindResponse;
import hr.fer.pi.planinarskidnevnik.models.Hill;
import hr.fer.pi.planinarskidnevnik.util.mapper.DefaultMapper;
import org.springframework.stereotype.Component;

@Component
public class HillToHillResponseMapper implements DefaultMapper<Hill, HillFindResponse> {


    @Override
    public HillFindResponse map(Hill from) {
        HillFindResponse response = new HillFindResponse();
        response.setValue(from.getId());
        response.setLabel(from.getName());

        return response;
    }
}
