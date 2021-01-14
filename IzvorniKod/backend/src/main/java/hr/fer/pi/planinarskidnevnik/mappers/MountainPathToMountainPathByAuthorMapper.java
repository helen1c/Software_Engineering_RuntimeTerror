package hr.fer.pi.planinarskidnevnik.mappers;

import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathByAuthorResponse;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.util.mapper.DefaultMapper;
import org.springframework.stereotype.Component;

@Component
public class MountainPathToMountainPathByAuthorMapper implements DefaultMapper<MountainPath, MountainPathByAuthorResponse> {
    @Override
    public MountainPathByAuthorResponse map(MountainPath from) {
        MountainPathByAuthorResponse response = new MountainPathByAuthorResponse();
        response.setId(from.getId());
        response.setDifficulty(from.getDifficulty());
        response.setName(from.getName());
        response.setEndPoint(from.getEndPoint());
        response.setStartPoint(from.getStartPoint());
        response.setLength(from.getLength());
        response.setPrivate(from.isPrivate());

        return response;
    }
}
