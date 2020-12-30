package hr.fer.pi.planinarskidnevnik.mappers;

import hr.fer.pi.planinarskidnevnik.dtos.MountainPathArchiveResponse;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.models.MountainPathUserArchive.MountainPathUserArchive;
import hr.fer.pi.planinarskidnevnik.util.mapper.DefaultMapper;
import org.springframework.stereotype.Component;

@Component
public class MountainPathUserArchiveToMountainPathArchiveResponseMapper implements DefaultMapper<MountainPathUserArchive, MountainPathArchiveResponse> {


    @Override
    public MountainPathArchiveResponse map(MountainPathUserArchive from) {

        MountainPathArchiveResponse response = new MountainPathArchiveResponse();
        response.setDateArchived(from.getDateArchived());
        response.setHillName(from.getMountainPath().getHill().getName());
        response.setId(from.getMountainPath().getId());
        response.setName(from.getMountainPath().getName());


        return response;
    }
}
