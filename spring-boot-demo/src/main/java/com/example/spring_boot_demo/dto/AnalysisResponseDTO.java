package com.example.spring_boot_demo.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AnalysisResponseDTO {

    private Long id;

    private BigDecimal atsScore;

    private String matchedSkills;

    private String missingSkills;

    private String missingRequirements;

    private LocalDateTime analyzedAt;

    public AnalysisResponseDTO() {
    }

    public AnalysisResponseDTO(
            Long id,
            BigDecimal atsScore,
            String matchedSkills,
            String missingSkills,
            String missingRequirements,
            LocalDateTime analyzedAt) {

        this.id = id;
        this.atsScore = atsScore;
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.missingRequirements = missingRequirements;
        this.analyzedAt = analyzedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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