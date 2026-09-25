package com.example.spring_boot_demo.service;

import com.example.spring_boot_demo.entity.JobDescription;
import com.example.spring_boot_demo.entity.JobDescriptionSkill;
import com.example.spring_boot_demo.entity.Skill;
import com.example.spring_boot_demo.entity.User;
import com.example.spring_boot_demo.repository.JobDescriptionRepository;
import com.example.spring_boot_demo.repository.JobDescriptionSkillRepository;
import com.example.spring_boot_demo.repository.SkillRepository;
import com.example.spring_boot_demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobDescriptionService {

    private final JobDescriptionRepository jobDescriptionRepository;
    private final JobDescriptionSkillRepository jobDescriptionSkillRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final SkillExtractionService skillExtractionService;

    public JobDescriptionService(
            JobDescriptionRepository jobDescriptionRepository,
            JobDescriptionSkillRepository jobDescriptionSkillRepository,
            UserRepository userRepository,
            SkillRepository skillRepository,
            SkillExtractionService skillExtractionService) {

        this.jobDescriptionRepository = jobDescriptionRepository;
        this.jobDescriptionSkillRepository = jobDescriptionSkillRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.skillExtractionService = skillExtractionService;
    }

    public JobDescription createJobDescription(
            Long userId,
            String jobTitle,
            String description) {

        // 1. Validate JD
        if (description == null || description.isBlank()) {
            throw new RuntimeException(
                    "Job description cannot be empty"
            );
        }

        // 2. Find user
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // 3. Create JobDescription
        JobDescription jobDescription =
                new JobDescription();

        jobDescription.setUser(user);
        jobDescription.setJobTitle(jobTitle);
        jobDescription.setDescription(description);

        // 4. Save JobDescription
        JobDescription savedJobDescription =
                jobDescriptionRepository.save(jobDescription);

        // 5. Extract skills from JD
        List<String> extractedSkills =
                skillExtractionService.extractSkills(description);

        System.out.println(
                "\n========== EXTRACTED JD SKILLS =========="
        );

        if (extractedSkills.isEmpty()) {

            System.out.println("No skills detected.");

        } else {

            extractedSkills.forEach(System.out::println);
        }

        System.out.println(
                "=========================================="
        );

        // 6. Save JD-Skill relationships
        for (String skillName : extractedSkills) {

            Skill skill = skillRepository
                    .findBySkillNameIgnoreCase(skillName)
                    .orElse(null);

            if (skill != null) {

                JobDescriptionSkill jdSkill =
                        new JobDescriptionSkill(
                                savedJobDescription,
                                skill
                        );

                jobDescriptionSkillRepository.save(jdSkill);
            }
        }

        // 7. Return saved JD
        return savedJobDescription;
    }
}