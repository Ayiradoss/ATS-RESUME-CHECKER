package com.example.spring_boot_demo.repository;

import com.example.spring_boot_demo.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository
        extends JpaRepository<Resume, Long> {

    List<Resume> findByUserId(Long userId);
}