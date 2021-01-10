package hr.fer.pi.planinarskidnevnik.util;

import hr.fer.pi.planinarskidnevnik.models.Hill;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
public class MountainLodgeGeneratingUtil {

    /**
     * Stvara domove kojima je image postavljen na null i nemaju infrastrukturu.
     * Kasnije ćemo ih samo modificirati ako trebamo promjene unutar testova.
     * @param number
     * @return
     */
    public static List<MountainLodge> generateLodgesEmptyUtilitiesAndImageNull(int number) {

        List<MountainLodge> lodges = new ArrayList<>();

        for(int i = 0 ; i < number ; i++) {
            MountainLodge mountainLodge = new MountainLodge();
            mountainLodge.setId((long) (i + 1));
            mountainLodge.setName("lodge" + (i + 1));
            mountainLodge.setElevation((long) (1000 + i));
            mountainLodge.setImage(null);
            mountainLodge.setUtilities(Collections.emptyList());
            Hill h1 = new Hill();
            h1.setId((long) (i + 1));
            h1.setName("hill" + (i + 1));

            mountainLodge.setHill(h1);
            lodges.add(mountainLodge);
        }

        return lodges;
    }


}
