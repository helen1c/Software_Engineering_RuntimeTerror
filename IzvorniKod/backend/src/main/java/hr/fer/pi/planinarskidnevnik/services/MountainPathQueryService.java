package hr.fer.pi.planinarskidnevnik.services;


import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathCreateRequest;
import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathGradeRequest;
import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathSearchRequest;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.models.MountainPathGrade;

import java.security.Principal;
import java.util.List;

public interface MountainPathQueryService {

    List<MountainPath> getAllMountainPaths();

    MountainPath createMountainPath(MountainPathCreateRequest createRequest, Principal principal);

    List<MountainPath> findAllMountainPathBySearchCriteria(MountainPathSearchRequest request);

    MountainPathGrade gradeMountainPath(MountainPathGradeRequest gradeRequest, Principal principal);
}
