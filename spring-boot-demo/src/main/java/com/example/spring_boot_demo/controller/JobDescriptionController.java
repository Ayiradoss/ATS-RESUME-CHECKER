package com.example.spring_boot_demo.controller;

import com.example.spring_boot_demo.entity.JobDescription;
import com.example.spring_boot_demo.service.JobDescriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/job-descriptions")
public class JobDescriptionController {

    private final JobDescriptionService jobDescriptionService;

    public JobDescriptionController(
            JobDescriptionService jobDescriptionService) {

        this.jobDescriptionService = jobDescriptionService;
    }

    @PostMapping
    public ResponseEntity<JobDescription> createJobDescription(
            @RequestParam Long userId,
            @RequestParam String jobTitle,
            @RequestParam String description) {

        JobDescription jobDescription =
                jobDescriptionService.createJobDescription(
                        userId,
                        jobTitle,
                        description
                );

        return ResponseEntity.ok(jobDescription);
    }
}