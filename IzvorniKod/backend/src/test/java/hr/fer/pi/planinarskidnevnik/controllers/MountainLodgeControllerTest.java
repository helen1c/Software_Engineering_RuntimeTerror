package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.MockMvcConfig.MockMvcConfig;
import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeCreateRequest;
import hr.fer.pi.planinarskidnevnik.dtos.MountainLodge.MountainLodgeCreateResponse;
import hr.fer.pi.planinarskidnevnik.mappers.MountainLodgeToMountainLodgeSearchResponseMapper;
import hr.fer.pi.planinarskidnevnik.models.Hill;
import hr.fer.pi.planinarskidnevnik.models.MountainLodge;
import hr.fer.pi.planinarskidnevnik.models.Utility;
import hr.fer.pi.planinarskidnevnik.services.MountainLodgeQueryService;
import hr.fer.pi.planinarskidnevnik.services.impl.UserService;
import hr.fer.pi.planinarskidnevnik.util.MountainLodgeGeneratingUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.security.Principal;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(value = MountainLodgeController.class)
@EnableAutoConfiguration(exclude = {SecurityAutoConfiguration.class, CommunityEventController.class})
@Import(MockMvcConfig.class)
public class MountainLodgeControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private MountainLodgeQueryService mountainLodgeQueryService;

    @Autowired
    private UserService userService;

    @Autowired
    private MountainLodgeToMountainLodgeSearchResponseMapper mapper;

    private static final String NON_ADMIN_AUTH = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsdWthLnJhdmVuc2Nha0BmZXIuaHIiLCJleHAiOjE2MDk5NTAxMjl9.AVliUzpZ3_Z3RRJPQAaek4RNcJ-_Jfhy5jMQWej0nJHAVXLfGaKtiZeL0I8Fb15QKTyihj61hodCBEacEypbrQ";
    private static final String ADMIN_AUTH = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBmZXIuaHIiLCJleHAiOjE2MTEyNTY4Njl9.hChtji1ZYtgFRdOPbj_KOgW9G8Ohm6RulnxO52OxK5ttxHK9KcJ8r0IBhm3gt7BGOFl66xwzUicqROtr2uOvvw";

    @Test
    public void GivenRequestAllFieldsNull_When_MountainLodgeSearch_Should_ReturnAllResults() throws Exception {

        List<MountainLodge> mountainLodges = MountainLodgeGeneratingUtil.generateLodgesEmptyUtilitiesAndImageNull(3);
        given(mountainLodgeQueryService.findAllMountainLodgeBySearchCriteria(any())).willReturn(mountainLodges);

        mvc.perform(post("/mountain-lodges/search")
                .content("{}")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].hillName", is("hill1")))
                .andExpect(jsonPath("$[1].hillName", is("hill2")))
                .andExpect(jsonPath("$[2].hillName", is("hill3")))
                .andExpect(jsonPath("$[0].name", is("lodge1")))
                .andExpect(jsonPath("$[1].name", is("lodge2")))
                .andExpect(jsonPath("$[2].name", is("lodge3")))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[2].id", is(3)));
    }

    @Test
    public void GivenRequestSearchTextEmpty_When_MountainLodgeSearch_Should_ReturnAllResults() throws Exception {

        List<MountainLodge> mountainLodges = MountainLodgeGeneratingUtil.generateLodgesEmptyUtilitiesAndImageNull(3);
        given(mountainLodgeQueryService.findAllMountainLodgeBySearchCriteria(any())).willReturn(mountainLodges);

        mvc.perform(post("/mountain-lodges/search")
                .content("{\"searchText\":\"\"}")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].hillName", is("hill1")))
                .andExpect(jsonPath("$[1].hillName", is("hill2")))
                .andExpect(jsonPath("$[2].hillName", is("hill3")))
                .andExpect(jsonPath("$[0].name", is("lodge1")))
                .andExpect(jsonPath("$[1].name", is("lodge2")))
                .andExpect(jsonPath("$[2].name", is("lodge3")))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[2].id", is(3)));
    }

    @Test
    public void GivenRequestWithAllFields_When_MountainLodgeSearch_Should_ReturnEmptyList() throws Exception {

        List<MountainLodge> mountainLodges = Collections.emptyList();
        given(mountainLodgeQueryService.findAllMountainLodgeBySearchCriteria(any())).willReturn(mountainLodges);

        mvc.perform(post("/mountain-lodges/search")
                .content("{\"searchText\":\"planinarski dom graficar\", \"hillId\":\"1\", \"utilities\":[\"1\"]}")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    public void GivenRequestWithAllFields_When_MountainLodgeSearch_Should_ReturnOneResultsGoodParams() throws Exception {

        List<MountainLodge> mountainLodges = MountainLodgeGeneratingUtil.generateLodgesEmptyUtilitiesAndImageNull(2);
        List<Utility> utilities = getUtilities();

        mountainLodges.get(0).setUtilities(utilities);
        mountainLodges.get(1).setUtilities(utilities);
        mountainLodges.get(1).setHill(mountainLodges.get(0).getHill());

        given(mountainLodgeQueryService.findAllMountainLodgeBySearchCriteria(any())).willReturn(mountainLodges);

        mvc.perform(post("/mountain-lodges/search")
                .content("{\"searchText\":\"lodge\", \"hillId\":\"1\", \"utilities\":[\"1\"]}")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].hillName", is("hill1")))
                .andExpect(jsonPath("$[1].hillName", is("hill1")))
                .andExpect(jsonPath("$[0].name", is("lodge1")))
                .andExpect(jsonPath("$[1].name", is("lodge2")))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[0].utilities", hasSize(1)))
                .andExpect(jsonPath("$[1].utilities", hasSize(1)));

    }

    @Test
    public void Given_PrincipalNotAdmin_When_createMountainLodge_ShouldReturnForbiddenStatus() throws Exception {

        mvc.perform(post("/mountain-lodges/create")
                .contentType(MediaType.APPLICATION_JSON).content("{\"name\":\"Graficar\", \"hillId\":\"1\", \"elevation\":\"1000\"}")
                .header("Authorization", NON_ADMIN_AUTH)).andExpect(status().isForbidden());

    }

    @Test
    public void Given_PrincipalAdmin_When_createMountainLodge_ShouldSuccess() throws Exception {

        MountainLodge lodge = getDefaultLodge();
        Principal adminPrincipal = getAdminPrincipal();

        given(userService.getRole(any())).willReturn("ADMIN");
        given(mountainLodgeQueryService.createMountainLodge(any())).willReturn(lodge);


        mvc.perform(post("/mountain-lodges/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Graficar\", \"hillId\":\"1\", \"elevation\":\"1000\"}")
                .principal(adminPrincipal))
                .andExpect(status().isCreated());

    }

    @Test
    public void Given_RequestWithoutRequiredField_When_createMountainLodge_ShouldReturnBadRequest() throws Exception {

        MountainLodge lodge = getDefaultLodge();
        Principal adminPrincipal = getAdminPrincipal();

        given(userService.getRole(any())).willReturn("ADMIN");
        given(mountainLodgeQueryService.createMountainLodge(any())).willReturn(lodge);


        mvc.perform(post("/mountain-lodges/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Graficar\", \"elevation\":\"1000\"}")
                .principal(adminPrincipal))
                .andExpect(status().isBadRequest());

    }

    private MountainLodge getDefaultLodge() {

        MountainLodge lodge = new MountainLodge();
        lodge.setName("Graficar");
        Hill h = new Hill();
        h.setName("Graficar");
        h.setId(1L);
        lodge.setHill(h);
        lodge.setElevation(1000L);

        return lodge;
    }

    Principal getAdminPrincipal() {
        return new Principal() {
            @Override
            public String getName() {
                return "admin@fer.hr";
            }
        };
    }


    private List<Utility> getUtilities() {

        Utility utility1 = new Utility();
        utility1.setId(1L);
        utility1.setName("Voda");
        return List.of(utility1);
    }

}
