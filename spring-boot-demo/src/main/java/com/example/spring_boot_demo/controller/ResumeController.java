package com.example.spring_boot_demo.controller;

import com.example.spring_boot_demo.entity.Resume;
import com.example.spring_boot_demo.service.PdfParserService;
import com.example.spring_boot_demo.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeService resumeService;
    private final PdfParserService pdfParserService;

    public ResumeController(
            ResumeService resumeService,
            PdfParserService pdfParserService) {

        this.resumeService = resumeService;
        this.pdfParserService = pdfParserService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Resume> uploadResume(
            @RequestParam("userId") Long userId,
            @RequestParam("file") MultipartFile file) {

        try
        {
            Resume resume = resumeService.uploadResume(userId, file);

            return ResponseEntity.ok(resume);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/test-pdf")
    public ResponseEntity<String> testPdf(
            @RequestParam("file") MultipartFile file) {

        try {
            String text = pdfParserService.extractText(file);

            return ResponseEntity.ok(text);
        }

        catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.badRequest()
                    .body("Could not read PDF");
        }
    }
}