package com.example.spring_boot_demo.controller;

import com.example.spring_boot_demo.entity.Analysis;
import com.example.spring_boot_demo.repository.AnalysisRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analyses")
public class AnalysisHistoryController {

    private final AnalysisRepository analysisRepository;

    public AnalysisHistoryController(
            AnalysisRepository analysisRepository) {

        this.analysisRepository = analysisRepository;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Analysis>> getUserAnalyses(
            @PathVariable Long userId) {

        List<Analysis> analyses =
                analysisRepository
                        .findByUserIdOrderByAnalyzedAtDesc(userId);

        return ResponseEntity.ok(analyses);
    }
}