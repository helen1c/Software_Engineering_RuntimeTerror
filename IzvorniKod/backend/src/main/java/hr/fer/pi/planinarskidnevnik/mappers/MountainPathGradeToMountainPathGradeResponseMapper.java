package hr.fer.pi.planinarskidnevnik.mappers;

import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathGradeResponse;
import hr.fer.pi.planinarskidnevnik.models.MountainPathGrade;
import hr.fer.pi.planinarskidnevnik.util.mapper.DefaultMapper;
import org.springframework.stereotype.Component;

@Component
public class MountainPathGradeToMountainPathGradeResponseMapper implements DefaultMapper<MountainPathGrade, MountainPathGradeResponse> {

    @Override
    public MountainPathGradeResponse map(MountainPathGrade from) {
        MountainPathGradeResponse response = new MountainPathGradeResponse();
        response.setMountainPathId(from.getPath().getId());
        response.setGrade(from.getGrade());
        return response;
    }
}
