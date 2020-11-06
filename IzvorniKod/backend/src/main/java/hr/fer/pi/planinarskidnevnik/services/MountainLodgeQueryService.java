package hr.fer.pi.planinarskidnevnik.services;

import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeSearchRequest;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import org.springframework.data.domain.Page;

public interface MountainLodgeQueryService {

    Page<MountainLodge> findAllMountainLodgeBySearchCriteria(MountainLodgeSearchRequest request);

}
