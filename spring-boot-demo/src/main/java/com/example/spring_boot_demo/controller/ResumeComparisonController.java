package com.example.spring_boot_demo.controller;

import com.example.spring_boot_demo.service.ResumeComparisonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/resume-comparison")
public class ResumeComparisonController {

    private final ResumeComparisonService resumeComparisonService;

    public ResumeComparisonController(
            ResumeComparisonService resumeComparisonService) {

        this.resumeComparisonService = resumeComparisonService;
    }

    @GetMapping
    public ResponseEntity<ResumeComparisonService.ComparisonResult>
    compareResumeWithJobDescription(
            @RequestParam Long resumeId,
            @RequestParam Long jobDescriptionId) {

        ResumeComparisonService.ComparisonResult result =
                resumeComparisonService
                        .compareResumeWithJobDescription(
                                resumeId,
                                jobDescriptionId
                        );

        return ResponseEntity.ok(result);
    }
}