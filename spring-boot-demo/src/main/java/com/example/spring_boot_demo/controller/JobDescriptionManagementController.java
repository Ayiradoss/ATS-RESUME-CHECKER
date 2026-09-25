package com.example.spring_boot_demo.controller;

import com.example.spring_boot_demo.entity.JobDescription;
import com.example.spring_boot_demo.repository.JobDescriptionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-descriptions")
public class JobDescriptionManagementController {

    private final JobDescriptionRepository jobDescriptionRepository;

    public JobDescriptionManagementController(
            JobDescriptionRepository jobDescriptionRepository) {

        this.jobDescriptionRepository = jobDescriptionRepository;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<JobDescription>> getUserJobDescriptions(
            @PathVariable Long userId) {

        List<JobDescription> jobDescriptions =
                jobDescriptionRepository.findByUserId(userId);

        return ResponseEntity.ok(jobDescriptions);
    }
}