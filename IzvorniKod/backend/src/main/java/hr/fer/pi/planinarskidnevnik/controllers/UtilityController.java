package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.dtos.Hill.HillFindResponse;
import hr.fer.pi.planinarskidnevnik.dtos.Utility.UtilityFindResponse;
import hr.fer.pi.planinarskidnevnik.mappers.HillToHillResponseMapper;
import hr.fer.pi.planinarskidnevnik.mappers.UtilityToUtilityResponseMapper;
import hr.fer.pi.planinarskidnevnik.models.Hill;
import hr.fer.pi.planinarskidnevnik.models.Utility;
import hr.fer.pi.planinarskidnevnik.services.HillQueryService;
import hr.fer.pi.planinarskidnevnik.services.UtilityQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/utilities")
public class UtilityController {

    private final UtilityQueryService utilityQueryService;
    private final UtilityToUtilityResponseMapper utilityToUtilityResponseMapper;

    @Autowired
    public UtilityController(UtilityQueryService utilityQueryService, UtilityToUtilityResponseMapper utilityToUtilityResponseMapper) {
        this.utilityQueryService = utilityQueryService;
        this.utilityToUtilityResponseMapper = utilityToUtilityResponseMapper;
    }

    @GetMapping("/all")
    public ResponseEntity<List<UtilityFindResponse>> findUtilitiesOrderedByName() {

        List<Utility> modelsResponse = utilityQueryService.getAllUtilities();
        List<UtilityFindResponse> responses = utilityToUtilityResponseMapper.mapToList(modelsResponse);

        return ResponseEntity.ok(responses);
    }

}