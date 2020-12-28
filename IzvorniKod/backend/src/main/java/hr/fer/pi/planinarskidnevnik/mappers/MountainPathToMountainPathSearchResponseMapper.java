package hr.fer.pi.planinarskidnevnik.mappers;

import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathSearchResponse;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.util.mapper.DefaultMapper;
import org.springframework.stereotype.Component;

@Component
public class MountainPathToMountainPathSearchResponseMapper implements DefaultMapper<MountainPath, MountainPathSearchResponse> {


    @Override
    public MountainPathSearchResponse map(MountainPath from) {

        MountainPathSearchResponse response = new MountainPathSearchResponse();

        response.setId(from.getId());
        response.setName(from.getName());
        response.setStartPoint(from.getStartPoint());
        response.setEndPoint(from.getEndPoint());
        response.setDateCreated(from.getDateCreated());
        response.setPrivate(from.isPrivate());
        response.setHill(from.getHill().getName());
        response.setAvgWalkTime(from.getAvgWalkTime());
        response.setLength(from.getLength());
        response.setSeaLevelDiff(from.getSeaLevelDiff());
        response.setDifficulty(from.getDifficulty());

        return response;
    }
}
