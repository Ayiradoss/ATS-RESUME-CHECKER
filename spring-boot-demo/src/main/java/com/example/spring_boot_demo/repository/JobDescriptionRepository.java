package com.example.spring_boot_demo.repository;

import com.example.spring_boot_demo.entity.JobDescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobDescriptionRepository extends JpaRepository<JobDescription, Long> {
    List<JobDescription> findByUserId(Long userId);
}