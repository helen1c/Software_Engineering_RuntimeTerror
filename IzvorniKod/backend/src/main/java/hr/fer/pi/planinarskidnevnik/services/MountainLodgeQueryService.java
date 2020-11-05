package hr.fer.pi.planinarskidnevnik.services;

import hr.fer.pi.planinarskidnevnik.dtos.MountainLodgeSearchRequest;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import org.springframework.data.domain.Page;

import java.util.List;

public interface MountainLodgeQueryService {

    Page<MountainLodge> findAllMountainLodgeBySearchCriteria(MountainLodgeSearchRequest request);

    List<MountainLodge> findAllLodges();

}
