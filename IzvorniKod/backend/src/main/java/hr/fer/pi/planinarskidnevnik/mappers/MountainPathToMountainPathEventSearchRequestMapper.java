package hr.fer.pi.planinarskidnevnik.mappers;

import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathEventSearchRequest;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.util.mapper.DefaultMapper;
import org.springframework.stereotype.Component;

@Component
public class MountainPathToMountainPathEventSearchRequestMapper implements DefaultMapper<MountainPath, MountainPathEventSearchRequest> {

    @Override
    public MountainPathEventSearchRequest map(MountainPath from) {

        MountainPathEventSearchRequest response = new MountainPathEventSearchRequest();

        response.setId(from.getId());
        response.setName(from.getName());
        response.setHill(from.getHill().getName());
        response.setStartPoint(from.getStartPoint());
        response.setEndPoint(from.getEndPoint());

        return response;
    }


}
