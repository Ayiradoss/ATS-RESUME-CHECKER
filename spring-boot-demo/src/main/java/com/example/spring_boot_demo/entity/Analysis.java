package com.example.spring_boot_demo.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "analyses")
public class Analysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User who performed the analysis
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Resume used for analysis
    @ManyToOne
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    // Job description used for analysis
    @ManyToOne
    @JoinColumn(name = "job_description_id", nullable = false)
    private JobDescription jobDescription;

    // ATS score
    @Column(
            name = "ats_score",
            precision = 5,
            scale = 2
    )
    private BigDecimal atsScore;

    // Matched skills
    @Column(
            name = "matched_skills",
            columnDefinition = "TEXT"
    )
    private String matchedSkills;

    // Missing skills
    @Column(
            name = "missing_skills",
            columnDefinition = "TEXT"
    )
    private String missingSkills;

    // Missing requirements
    @Column(
            name = "missing_requirements",
            columnDefinition = "TEXT"
    )
    private String missingRequirements;

    // Analysis date and time
    @Column(name = "analyzed_at")
    private LocalDateTime analyzedAt;


    // Default constructor
    public Analysis() {
    }


    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Resume getResume() {
        return resume;
    }

    public void setResume(Resume resume) {
        this.resume = resume;
    }

    public JobDescription getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(JobDescription jobDescription) {
        this.jobDescription = jobDescription;
    }

    public BigDecimal getAtsScore() {
        return atsScore;
    }

    public void setAtsScore(BigDecimal atsScore) {
        this.atsScore = atsScore;
    }

    public String getMatchedSkills() {
        return matchedSkills;
    }

    public void setMatchedSkills(String matchedSkills) {
        this.matchedSkills = matchedSkills;
    }

    public String getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(String missingSkills) {
        this.missingSkills = missingSkills;
    }

    public String getMissingRequirements() {
        return missingRequirements;
    }

    public void setMissingRequirements(String missingRequirements) {
        this.missingRequirements = missingRequirements;
    }

    public LocalDateTime getAnalyzedAt() {
        return analyzedAt;
    }

    public void setAnalyzedAt(LocalDateTime analyzedAt) {
        this.analyzedAt = analyzedAt;
    }
}