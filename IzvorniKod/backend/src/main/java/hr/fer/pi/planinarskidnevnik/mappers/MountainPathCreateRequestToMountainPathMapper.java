package hr.fer.pi.planinarskidnevnik.mappers;

import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathCreateRequest;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.util.mapper.DefaultMapper;
import org.springframework.stereotype.Component;

@Component
public class MountainPathCreateRequestToMountainPathMapper implements DefaultMapper<MountainPathCreateRequest, MountainPath> {
    @Override
    public MountainPath map(MountainPathCreateRequest from) {

        MountainPath mp = new MountainPath();
        mp.setAvgWalkTime(from.getAvgWalkTime());
        mp.setDateCreated(from.getDateCreated());
        mp.setEndPoint(from.getEndPoint());
        mp.setStartPoint(from.getStartPoint());
        mp.setLength(from.getLength());
        mp.setName(from.getName());
        mp.setPrivate(from.isPrivate());
        mp.setSeaLevelDiff(from.getSeaLevelDiff());


        return mp;
    }
}
