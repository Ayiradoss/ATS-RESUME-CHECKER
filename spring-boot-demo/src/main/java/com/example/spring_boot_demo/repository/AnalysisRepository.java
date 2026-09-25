package com.example.spring_boot_demo.repository;

import com.example.spring_boot_demo.entity.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnalysisRepository
        extends JpaRepository<Analysis, Long> {

    List<Analysis> findByUserId(Long userId);

    List<Analysis> findByUserIdOrderByAnalyzedAtDesc(Long userId);
}