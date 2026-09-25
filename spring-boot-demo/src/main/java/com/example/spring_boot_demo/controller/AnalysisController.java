package com.example.spring_boot_demo.controller;

import com.example.spring_boot_demo.dto.AnalysisResponseDTO;
import com.example.spring_boot_demo.service.AnalysisService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/analyses")
public class AnalysisController {

    private final AnalysisService analysisService;

    public AnalysisController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    // Get all analyses
    @GetMapping
    public ResponseEntity<List<AnalysisResponseDTO>> getAllAnalyses() {

        List<AnalysisResponseDTO> analyses =
                analysisService.getAllAnalyses();

        return ResponseEntity.ok(analyses);
    }

    // Get analysis by ID
    @GetMapping("/{id}")
    public ResponseEntity<AnalysisResponseDTO> getAnalysisById(
            @PathVariable Long id) {

        AnalysisResponseDTO analysis =
                analysisService.getAnalysisById(id);

        return ResponseEntity.ok(analysis);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AnalysisResponseDTO>> getAnalysesByUserId(
            @PathVariable Long userId) {

        List<AnalysisResponseDTO> analyses =
                analysisService.getAnalysesByUserId(userId);

        return ResponseEntity.ok(analyses);
    }
}