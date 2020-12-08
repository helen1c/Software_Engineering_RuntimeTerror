package hr.fer.pi.planinarskidnevnik.services;


import hr.fer.pi.planinarskidnevnik.dtos.MountainPath.MountainPathCreate;
import hr.fer.pi.planinarskidnevnik.models.MountainPath;

import java.util.List;

public interface MountainPathQueryService {

    List<MountainPath> getAllMountainPaths();

    MountainPath createMountainPath(MountainPathCreate dto);
}
