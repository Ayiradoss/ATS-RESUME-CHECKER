package com.example.spring_boot_demo.repository;

import com.example.spring_boot_demo.entity.ResumeSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeSkillRepository extends JpaRepository<ResumeSkill, Long> {
    List<ResumeSkill> findByResumeId(Long resumeId);
}