package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.dtos.Hill.HillFindResponse;
import hr.fer.pi.planinarskidnevnik.mappers.HillToHillResponseMapper;
import hr.fer.pi.planinarskidnevnik.models.Hill;
import hr.fer.pi.planinarskidnevnik.services.HillQueryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hills")
public class HillController {

    private final HillQueryService hillQueryService;
    private final HillToHillResponseMapper hillResponseMapper;

    public HillController(HillQueryService hillQueryService, HillToHillResponseMapper hillResponseMapper) {
        this.hillQueryService = hillQueryService;
        this.hillResponseMapper = hillResponseMapper;
    }

    @GetMapping("/all")
    public ResponseEntity<List<HillFindResponse>> findAllHillsOrderedByName() {

        List<Hill> modelsResponse = hillQueryService.getAllHills();
        List<HillFindResponse> response = hillResponseMapper.mapToList(modelsResponse);

        return ResponseEntity.ok(response);
    }

}
