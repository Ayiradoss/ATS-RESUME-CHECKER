package com.example.spring_boot_demo.service;

import com.example.spring_boot_demo.entity.Skill;
import com.example.spring_boot_demo.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class SkillExtractionService {

    private final SkillRepository skillRepository;

    public SkillExtractionService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<String> extractSkills(String resumeText) {

        List<String> extractedSkills = new ArrayList<>();

        if (resumeText == null || resumeText.isBlank()) {
            return extractedSkills;
        }

        String normalizedText = resumeText.toLowerCase();

        List<Skill> skills = skillRepository.findAll();

        for (Skill skill : skills) {

            String skillName = skill.getSkillName();

            if (skillName == null || skillName.isBlank()) {
                continue;
            }

            String normalizedSkillName =
                    skillName.toLowerCase().trim();

            /*
             * Escape special characters in the skill name.
             * This is important for skills like:
             * C#
             * C++
             * .NET
             * etc.
             */
            String escapedSkillName =
                    Pattern.quote(normalizedSkillName);

            /*
             * Match the complete skill instead of
             * matching the skill inside another word.
             *
             * Example:
             *
             * "c" should match:
             * "C"
             *
             * But should NOT match:
             * "experience"
             * "developer"
             *
             * "sql" should match:
             * "SQL"
             *
             * But should NOT match:
             * "MySQL"
             */
            String regex =
                    "(?<![a-zA-Z0-9])"
                            + escapedSkillName
                            + "(?![a-zA-Z0-9])";

            if (Pattern.compile(regex)
                    .matcher(normalizedText)
                    .find()) {

                extractedSkills.add(skill.getSkillName());
            }
        }

        return extractedSkills;
    }
}