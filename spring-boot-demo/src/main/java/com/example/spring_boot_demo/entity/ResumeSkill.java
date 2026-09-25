package com.example.spring_boot_demo.entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "resume_skills",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"resume_id", "skill_id"})
        }
)
public class ResumeSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    public ResumeSkill() {
    }

    public ResumeSkill(Resume resume, Skill skill) {
        this.resume = resume;
        this.skill = skill;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Resume getResume() {
        return resume;
    }

    public void setResume(Resume resume) {
        this.resume = resume;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }
}