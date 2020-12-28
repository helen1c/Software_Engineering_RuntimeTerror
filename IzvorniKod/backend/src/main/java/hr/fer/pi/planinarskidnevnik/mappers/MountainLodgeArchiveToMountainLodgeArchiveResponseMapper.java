package hr.fer.pi.planinarskidnevnik.mappers;

import hr.fer.pi.planinarskidnevnik.dtos.MountainLodgeArchive.MountainLodgeArchiveResponse;
import hr.fer.pi.planinarskidnevnik.models.MountainLodgeUserArchive;
import hr.fer.pi.planinarskidnevnik.util.mapper.DefaultMapper;
import org.springframework.stereotype.Component;

@Component
public class MountainLodgeArchiveToMountainLodgeArchiveResponseMapper implements DefaultMapper<MountainLodgeUserArchive, MountainLodgeArchiveResponse> {


    @Override
    public MountainLodgeArchiveResponse map(MountainLodgeUserArchive from) {

        MountainLodgeArchiveResponse r = new MountainLodgeArchiveResponse();
        r.setId(from.getMountainLodge().getId());
        r.setHillName(from.getMountainLodge().getHill().getName());
        r.setDateArchived(from.getDateArchived());
        r.setName(from.getMountainLodge().getName());

        return r;
    }
}
