package com.example.spring_boot_demo.repository;

import com.example.spring_boot_demo.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    Optional<Skill> findBySkillNameIgnoreCase(String skillName);
}