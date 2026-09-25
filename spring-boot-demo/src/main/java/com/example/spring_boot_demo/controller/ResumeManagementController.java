package com.example.spring_boot_demo.controller;

import com.example.spring_boot_demo.entity.Resume;
import com.example.spring_boot_demo.repository.ResumeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
public class ResumeManagementController {

    private final ResumeRepository resumeRepository;

    public ResumeManagementController(
            ResumeRepository resumeRepository) {

        this.resumeRepository = resumeRepository;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Resume>> getUserResumes(
            @PathVariable Long userId) {

        List<Resume> resumes =
                resumeRepository.findByUserId(userId);

        return ResponseEntity.ok(resumes);
    }
}