package com.example.spring_boot_demo.service;

import com.example.spring_boot_demo.entity.Resume;
import com.example.spring_boot_demo.entity.ResumeSkill;
import com.example.spring_boot_demo.entity.Skill;
import com.example.spring_boot_demo.entity.User;
import com.example.spring_boot_demo.repository.ResumeRepository;
import com.example.spring_boot_demo.repository.ResumeSkillRepository;
import com.example.spring_boot_demo.repository.SkillRepository;
import com.example.spring_boot_demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final ResumeSkillRepository resumeSkillRepository;
    private final PdfTextExtractionService pdfTextExtractionService;
    private final SkillExtractionService skillExtractionService;

    private final String uploadDirectory = "uploads/resumes/";

    public ResumeService(
            ResumeRepository resumeRepository,
            UserRepository userRepository,
            SkillRepository skillRepository,
            ResumeSkillRepository resumeSkillRepository,
            PdfTextExtractionService pdfTextExtractionService,
            SkillExtractionService skillExtractionService) {

        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.resumeSkillRepository = resumeSkillRepository;
        this.pdfTextExtractionService = pdfTextExtractionService;
        this.skillExtractionService = skillExtractionService;
    }

    public Resume uploadResume(Long userId, MultipartFile file) throws IOException {

        // 1. Check whether file exists
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Please select a file");
        }

        // 2. Get original file name
        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null || originalFileName.isBlank()) {
            throw new RuntimeException("Invalid file name");
        }

        // 3. Check file extension
        String fileName = originalFileName.toLowerCase();

        if (!(fileName.endsWith(".pdf")
                || fileName.endsWith(".doc")
                || fileName.endsWith(".docx"))) {

            throw new RuntimeException(
                    "Only PDF, DOC and DOCX files are allowed"
            );
        }

        // 4. Find user
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // 5. Create upload directory
        Path uploadPath = Paths.get(uploadDirectory);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 6. Create unique file name
        String uniqueFileName = UUID.randomUUID() + "_" + originalFileName;

        // 7. Create complete file path
        Path filePath = uploadPath.resolve(uniqueFileName);

        // 8. Save physical file
        Files.copy(file.getInputStream(), filePath);

        // 9. Create Resume entity
        Resume resume = new Resume();

        resume.setFileName(originalFileName);
        resume.setFileType(getFileExtension(originalFileName));
        resume.setFilePath(filePath.toString());
        resume.setUploadedAt(LocalDateTime.now());
        resume.setUser(user);

        // 10. Save Resume first
        Resume savedResume = resumeRepository.save(resume);

        // 11. Extract text from PDF
        if (fileName.endsWith(".pdf")) {

            String extractedText =
                    pdfTextExtractionService.extractText(
                            filePath.toString()
                    );

            System.out.println(
                    "\n========== EXTRACTED RESUME TEXT =========="
            );

            System.out.println(extractedText);

            System.out.println(
                    "============================================"
            );

            // 12. Extract skills
            List<String> extractedSkills =
                    skillExtractionService.extractSkills(extractedText);

            System.out.println(
                    "\n========== EXTRACTED SKILLS =========="
            );

            if (extractedSkills.isEmpty()) {

                System.out.println("No skills detected.");

            } else {

                extractedSkills.forEach(System.out::println);
            }

            System.out.println(
                    "======================================"
            );

            // 13. Save Resume-Skill relationships
            for (String skillName : extractedSkills) {

                Skill skill = skillRepository
                        .findBySkillNameIgnoreCase(skillName)
                        .orElse(null);

                if (skill != null) {

                    ResumeSkill resumeSkill =
                            new ResumeSkill(savedResume, skill);

                    resumeSkillRepository.save(resumeSkill);
                }
            }
        }

        // 14. Return saved resume
        return savedResume;
    }

    private String getFileExtension(String fileName) {

        int lastDot = fileName.lastIndexOf(".");

        if (lastDot == -1) {
            return "";
        }

        return fileName
                .substring(lastDot + 1)
                .toUpperCase();
    }
}