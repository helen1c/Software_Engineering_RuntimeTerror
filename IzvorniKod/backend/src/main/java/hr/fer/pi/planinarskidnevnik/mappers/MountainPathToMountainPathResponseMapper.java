package hr.fer.pi.planinarskidnevnik.mappers;

import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathFindResponse;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.util.mapper.DefaultMapper;
import org.springframework.stereotype.Component;

@Component
public class MountainPathToMountainPathResponseMapper implements DefaultMapper<MountainPath, MountainPathFindResponse> {

    @Override
    public MountainPathFindResponse map(MountainPath from) {
        MountainPathFindResponse response = new MountainPathFindResponse();

        response.setId(from.getId());
        response.setName(from.getName());
        response.setStartPoint(from.getStartPoint());
        response.setEndPoint(from.getEndPoint());
        response.setAvgWalkTime(from.getAvgWalkTime());
        response.setDateCreated(from.getDateCreated());
        response.setHill(from.getHill().getName());
        response.setLength(from.getLength());
        response.setPrivate(from.isPrivate());
        response.setSeaLevelDiff(from.getSeaLevelDiff());

        return response;
    }
}
