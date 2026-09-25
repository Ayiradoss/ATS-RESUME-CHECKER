package com.example.spring_boot_demo.entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "jd_skills",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"job_description_id", "skill_id"}
                )
        }
)
public class JobDescriptionSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_description_id", nullable = false)
    private JobDescription jobDescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    public JobDescriptionSkill() {
    }

    public JobDescriptionSkill(
            JobDescription jobDescription,
            Skill skill) {

        this.jobDescription = jobDescription;
        this.skill = skill;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public JobDescription getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(JobDescription jobDescription) {
        this.jobDescription = jobDescription;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }
}