package com.example.spring_boot_demo.repository;

import com.example.spring_boot_demo.entity.JobDescriptionSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobDescriptionSkillRepository
        extends JpaRepository<JobDescriptionSkill, Long> {

    List<JobDescriptionSkill> findByJobDescriptionId(Long jobDescriptionId);
}