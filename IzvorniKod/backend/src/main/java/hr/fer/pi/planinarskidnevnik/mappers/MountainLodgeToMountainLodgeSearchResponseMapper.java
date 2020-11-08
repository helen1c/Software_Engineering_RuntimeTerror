package hr.fer.pi.planinarskidnevnik.mappers;

import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeSearchResponse;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import hr.fer.pi.planinarskidnevnik.util.mapper.DefaultMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class MountainLodgeToMountainLodgeSearchResponseMapper implements DefaultMapper<MountainLodge, MountainLodgeSearchResponse> {


    @Override
    public MountainLodgeSearchResponse map(MountainLodge from) {

        MountainLodgeSearchResponse response = new MountainLodgeSearchResponse();

        response.setId(from.getId());
        response.setName(from.getName());
        response.setImage(from.getImage());
        response.setElevation(from.getElevation());
        response.setUtilities(from.getUtilities().stream().map(v -> v.getName()).collect(Collectors.toList()));
        response.setHillName(from.getHill().getName());

        return response;
    }
}
