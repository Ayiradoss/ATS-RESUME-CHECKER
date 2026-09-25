package com.example.spring_boot_demo.service;

import com.example.spring_boot_demo.entity.Analysis;
import com.example.spring_boot_demo.entity.JobDescription;
import com.example.spring_boot_demo.entity.JobDescriptionSkill;
import com.example.spring_boot_demo.entity.Resume;
import com.example.spring_boot_demo.entity.ResumeSkill;
import com.example.spring_boot_demo.entity.User;
import com.example.spring_boot_demo.repository.AnalysisRepository;
import com.example.spring_boot_demo.repository.JobDescriptionRepository;
import com.example.spring_boot_demo.repository.JobDescriptionSkillRepository;
import com.example.spring_boot_demo.repository.ResumeRepository;
import com.example.spring_boot_demo.repository.ResumeSkillRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ResumeComparisonService {

    private final ResumeRepository resumeRepository;
    private final JobDescriptionRepository jobDescriptionRepository;
    private final ResumeSkillRepository resumeSkillRepository;
    private final JobDescriptionSkillRepository jobDescriptionSkillRepository;
    private final AnalysisRepository analysisRepository;

    public ResumeComparisonService(
            ResumeRepository resumeRepository,
            JobDescriptionRepository jobDescriptionRepository,
            ResumeSkillRepository resumeSkillRepository,
            JobDescriptionSkillRepository jobDescriptionSkillRepository,
            AnalysisRepository analysisRepository) {

        this.resumeRepository = resumeRepository;
        this.jobDescriptionRepository = jobDescriptionRepository;
        this.resumeSkillRepository = resumeSkillRepository;
        this.jobDescriptionSkillRepository = jobDescriptionSkillRepository;
        this.analysisRepository = analysisRepository;
    }

    public ComparisonResult compareResumeWithJobDescription(
            Long resumeId,
            Long jobDescriptionId) {

        // 1. Find Resume
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        // 2. Find Job Description
        JobDescription jobDescription =
                jobDescriptionRepository.findById(jobDescriptionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Job description not found"));

        // 3. Get only skills belonging to this Resume
        List<ResumeSkill> resumeSkills =
                resumeSkillRepository.findByResumeId(resumeId);

        // 4. Get only skills belonging to this Job Description
        List<JobDescriptionSkill> jdSkills =
                jobDescriptionSkillRepository
                        .findByJobDescriptionId(jobDescriptionId);

        // 5. Store Resume skill names
        Set<String> resumeSkillNames = new HashSet<>();

        for (ResumeSkill resumeSkill : resumeSkills) {

            if (resumeSkill.getSkill() != null) {

                resumeSkillNames.add(
                        resumeSkill.getSkill()
                                .getSkillName()
                                .toLowerCase()
                                .trim()
                );
            }
        }

        // 6. Store JD skill names
        Set<String> jdSkillNames = new HashSet<>();

        for (JobDescriptionSkill jdSkill : jdSkills) {

            if (jdSkill.getSkill() != null) {

                jdSkillNames.add(
                        jdSkill.getSkill()
                                .getSkillName()
                                .toLowerCase()
                                .trim()
                );
            }
        }

        // 7. Find matched skills
        Set<String> matchedSkills =
                new HashSet<>(resumeSkillNames);

        matchedSkills.retainAll(jdSkillNames);

        // 8. Find missing skills
        Set<String> missingSkills =
                new HashSet<>(jdSkillNames);

        missingSkills.removeAll(resumeSkillNames);

        // 9. Calculate ATS score
        double atsScore = 0.0;

        if (!jdSkillNames.isEmpty()) {

            atsScore =
                    ((double) matchedSkills.size()
                            / jdSkillNames.size()) * 100;
        }

        // Round score to 2 decimal places
        atsScore =
                Math.round(atsScore * 100.0) / 100.0;

        // 10. Get User from Resume
        User user = resume.getUser();

        // 11. Create Analysis
        Analysis analysis = new Analysis();

        analysis.setUser(user);
        analysis.setResume(resume);
        analysis.setJobDescription(jobDescription);

        analysis.setAtsScore(
                BigDecimal.valueOf(atsScore)
        );

        analysis.setMatchedSkills(
                String.join(", ", matchedSkills)
        );

        analysis.setMissingSkills(
                String.join(", ", missingSkills)
        );

        // Currently no missing requirements
        analysis.setMissingRequirements("");

        analysis.setAnalyzedAt(
                LocalDateTime.now()
        );

        // 12. Save Analysis
        analysisRepository.save(analysis);

        // 13. Return comparison result
        return new ComparisonResult(
                matchedSkills,
                missingSkills,
                jdSkillNames.size(),
                matchedSkills.size(),
                atsScore
        );
    }

    // ==========================================
    // Comparison Result
    // ==========================================

    public static class ComparisonResult {

        private final Set<String> matchedSkills;
        private final Set<String> missingSkills;
        private final int totalJdSkills;
        private final int matchedSkillCount;
        private final double atsScore;

        public ComparisonResult(
                Set<String> matchedSkills,
                Set<String> missingSkills,
                int totalJdSkills,
                int matchedSkillCount,
                double atsScore) {

            this.matchedSkills = matchedSkills;
            this.missingSkills = missingSkills;
            this.totalJdSkills = totalJdSkills;
            this.matchedSkillCount = matchedSkillCount;
            this.atsScore = atsScore;
        }

        public Set<String> getMatchedSkills() {
            return matchedSkills;
        }

        public Set<String> getMissingSkills() {
            return missingSkills;
        }

        public int getTotalJdSkills() {
            return totalJdSkills;
        }

        public int getMatchedSkillCount() {
            return matchedSkillCount;
        }

        public double getAtsScore() {
            return atsScore;
        }
    }
}