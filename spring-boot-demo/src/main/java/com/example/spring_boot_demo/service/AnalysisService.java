package com.example.spring_boot_demo.service;

import com.example.spring_boot_demo.dto.AnalysisResponseDTO;
import com.example.spring_boot_demo.entity.Analysis;
import com.example.spring_boot_demo.repository.AnalysisRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalysisService {

    private final AnalysisRepository analysisRepository;

    public AnalysisService(AnalysisRepository analysisRepository) {
        this.analysisRepository = analysisRepository;
    }

    // Get all analyses
    public List<AnalysisResponseDTO> getAllAnalyses() {

        List<Analysis> analyses =
                analysisRepository.findAll();

        return analyses.stream()
                .map(this::convertToDTO)
                .toList();
    }

    // Get analysis by ID
    public AnalysisResponseDTO getAnalysisById(Long id) {

        Analysis analysis =
                analysisRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Analysis not found"));

        return convertToDTO(analysis);
    }

    // Convert Entity → DTO
    private AnalysisResponseDTO convertToDTO(
            Analysis analysis) {

        return new AnalysisResponseDTO(
                analysis.getId(),
                analysis.getAtsScore(),
                analysis.getMatchedSkills(),
                analysis.getMissingSkills(),
                analysis.getMissingRequirements(),
                analysis.getAnalyzedAt()
        );
    }
    public List<AnalysisResponseDTO> getAnalysesByUserId(Long userId) {

        List<Analysis> analyses =
                analysisRepository.findByUserId(userId);

        return analyses.stream()
                .map(this::convertToDTO)
                .toList();
    }
}