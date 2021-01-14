package hr.fer.pi.planinarskidnevnik.services;


import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathCreateRequest;
import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathGradeRequest;
import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathSearchRequest;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;
import hr.fer.pi.planinarskidnevnik.models.MountainPathGrade;

import java.security.Principal;
import java.util.List;

public interface MountainPathQueryService {

    MountainPath getMountainPathById(Long id);

    List<MountainPath> getAllMountainPaths();

    MountainPath createMountainPath(MountainPathCreateRequest createRequest, Principal principal);

    List<MountainPath> findAllMountainPathBySearchCriteria(MountainPathSearchRequest request);

    MountainPathGrade gradeMountainPath(MountainPathGradeRequest gradeRequest, Principal principal);

    void deleteMountainPathGrade(Principal principal, Long pathId);

    List<MountainPath> findAllMountainPathsByAuthor(Principal principal);

    MountainPath makeMountainPathNonPrivate(Principal principal, Long pathId);

    void deleteMountainPath(Principal principal, Long pathId);

    List<MountainPath> getAllPublicMountainPaths();

}
