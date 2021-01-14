package hr.fer.pi.planinarskidnevnik.services;

import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeCreateRequest;
import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeSearchRequest;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import java.util.List;

import javax.transaction.Transactional;
import java.util.Collections;

@Transactional
@SpringBootTest
@Sql(value = {"classpath:/db/scripts/MountainLodge.sql"})
public class MountainLodgeQueryServiceTest {


    @Autowired
    private MountainLodgeQueryService mountainLodgeQueryService;

    @Test
    public void Given_ValidRequest_When_SearchMountainLodgesBySearchCriteria_Should_ReturnResultsFromDb(){

        MountainLodgeSearchRequest request = new MountainLodgeSearchRequest();
        request.setHillId(1000L);
        request.setSearchText("vrleti");
        request.setUtilities(Collections.emptyList());

        List<MountainLodge> response = mountainLodgeQueryService.findAllMountainLodgeBySearchCriteria(request);

        Assert.assertEquals(1, response.size());
        Assert.assertEquals("Hajducke vrleti", response.get(0).getName());
        Assert.assertEquals(Long.valueOf(1000), response.get(0).getId());
        Assert.assertEquals(4, response.get(0).getUtilities().size());

    }

    @Test
    public void Given_ValidRequestWithUtilities_When_SearchMountainLodgesBySearchCriteria_Should_ReturnResultsFromDb(){

        MountainLodgeSearchRequest request = new MountainLodgeSearchRequest();

        request.setSearchText("v");
        request.setUtilities(List.of(1000L, 1001L));

        List<MountainLodge> response = mountainLodgeQueryService.findAllMountainLodgeBySearchCriteria(request);

        Assert.assertEquals(3, response.size());
        Assert.assertEquals("Hajducke vrleti", response.get(0).getName());
        Assert.assertEquals("Veleske vrleti", response.get(1).getName());
        Assert.assertEquals("Cvrsci san", response.get(2).getName());

        Assert.assertEquals(Long.valueOf(1000), response.get(0).getId());
        Assert.assertEquals(Long.valueOf(1001), response.get(1).getId());
        Assert.assertEquals(Long.valueOf(1003), response.get(2).getId());
    }

    @Test
    public void Given_ValidRequestNoMatchingLodgeName_When_SearchMountainLodgesBySearchCriteria_Should_ReturnEmptyList(){

        MountainLodgeSearchRequest request = new MountainLodgeSearchRequest();
        request.setSearchText("Planinarski dom graficar");
        request.setUtilities(List.of(1000L, 1001L));

        List<MountainLodge> response = mountainLodgeQueryService.findAllMountainLodgeBySearchCriteria(request);
        Assert.assertEquals(0, response.size());
    }

    @Test
    public void Given_ValidRequestUppercase_When_SearchMountainLodgesBySearchCriteria_Should_ReturnOneResult(){

        MountainLodgeSearchRequest request = new MountainLodgeSearchRequest();
        request.setSearchText("HAJDUCKE vRlEti");

        List<MountainLodge> response = mountainLodgeQueryService.findAllMountainLodgeBySearchCriteria(request);
        Assert.assertEquals(1, response.size());
        Assert.assertEquals("Hajducke vrleti", response.get(0).getName());
    }

}
