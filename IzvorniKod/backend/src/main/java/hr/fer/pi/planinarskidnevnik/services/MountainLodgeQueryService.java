package hr.fer.pi.planinarskidnevnik.services;

import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeDto;
import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeSearchRequest;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;

import java.util.List;

public interface MountainLodgeQueryService {

    List<MountainLodge> findAllMountainLodgeBySearchCriteria(MountainLodgeSearchRequest request);

    MountainLodge createMountainLodge(MountainLodgeDto dto);
}
