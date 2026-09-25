package com.example.spring_boot_demo.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class PdfParserService {

    public String extractText(MultipartFile file) throws IOException {

        byte[] fileBytes = file.getBytes();

        try (var document = Loader.loadPDF(fileBytes)) {

            PDFTextStripper pdfTextStripper = new PDFTextStripper();

            return pdfTextStripper.getText(document);
        }
    }
}