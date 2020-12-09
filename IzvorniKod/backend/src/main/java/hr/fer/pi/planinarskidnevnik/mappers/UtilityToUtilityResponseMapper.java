package hr.fer.pi.planinarskidnevnik.mappers;

import hr.fer.pi.planinarskidnevnik.dtos.Utility.UtilityFindResponse;
import hr.fer.pi.planinarskidnevnik.models.Utility;
import hr.fer.pi.planinarskidnevnik.util.mapper.DefaultMapper;
import org.springframework.stereotype.Component;

@Component
public class UtilityToUtilityResponseMapper implements DefaultMapper<Utility, UtilityFindResponse> {

    @Override
    public UtilityFindResponse map(Utility from) {
        UtilityFindResponse response = new UtilityFindResponse();
        response.setLabel(from.getId());
        response.setValue(from.getName());

        return response;
    }
}
