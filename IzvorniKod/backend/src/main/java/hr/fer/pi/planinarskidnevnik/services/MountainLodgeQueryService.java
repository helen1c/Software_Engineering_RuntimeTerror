package hr.fer.pi.planinarskidnevnik.services;

import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeCreateRequest;
import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeSearchRequest;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;

import java.util.List;

public interface MountainLodgeQueryService {

    List<MountainLodge> findAllMountainLodgeBySearchCriteria(MountainLodgeSearchRequest request);

    MountainLodge createMountainLodge(MountainLodgeCreateRequest dto);
}
