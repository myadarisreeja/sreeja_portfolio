package com.sreeja.portfolio.controller;

import com.sreeja.portfolio.dto.ContactRequest;
import com.sreeja.portfolio.dto.EndorsementRequest;
import com.sreeja.portfolio.dto.PortfolioResponse;
import com.sreeja.portfolio.model.ContactMessage;
import com.sreeja.portfolio.model.Endorsement;
import com.sreeja.portfolio.model.Project;
import com.sreeja.portfolio.repository.EndorsementRepository;
import com.sreeja.portfolio.repository.ProjectRepository;
import com.sreeja.portfolio.service.ContactService;
import com.sreeja.portfolio.service.EndorsementService;
import com.sreeja.portfolio.service.PortfolioService;
import jakarta.validation.Valid;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.sql.DataSource;
import java.sql.Connection;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Public REST API endpoints powering the portfolio frontend and interactive widgets.
 */
@RestController
@RequestMapping("/api")
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final ContactService contactService;
    private final EndorsementService endorsementService;
    private final ProjectRepository projectRepository;
    private final EndorsementRepository endorsementRepository;
    private final DataSource dataSource;

    public PortfolioController(
            PortfolioService portfolioService,
            ContactService contactService,
            EndorsementService endorsementService,
            ProjectRepository projectRepository,
            EndorsementRepository endorsementRepository,
            DataSource dataSource) {
        this.portfolioService = portfolioService;
        this.contactService = contactService;
        this.endorsementService = endorsementService;
        this.projectRepository = projectRepository;
        this.endorsementRepository = endorsementRepository;
        this.dataSource = dataSource;
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        String dbProduct = "Unknown";
        try (Connection conn = dataSource.getConnection()) {
            dbProduct = conn.getMetaData().getDatabaseProductName();
        } catch (Exception ignored) {
            dbProduct = "Unavailable";
        }
        Map<String, Object> status = new LinkedHashMap<>();
        status.put("status", "UP");
        status.put("service", "sreeja-portfolio-api");
        status.put("javaVersion", System.getProperty("java.version"));
        status.put("database", dbProduct);
        status.put("projectsCount", projectRepository.count());
        status.put("endorsementsCount", endorsementRepository.count());
        status.put("timestamp", Instant.now());
        return status;
    }

    @GetMapping("/portfolio")
    public PortfolioResponse getPortfolio() {
        return portfolioService.getFullPortfolio();
    }

    @GetMapping("/projects")
    public List<Project> getProjects(@RequestParam(required = false) String category) {
        return portfolioService.getProjects(category);
    }

    @PostMapping("/projects/{id}/like")
    public Project likeProject(@PathVariable Long id) {
        return portfolioService.incrementProjectLike(id);
    }

    @GetMapping("/endorsements")
    public List<Endorsement> getEndorsements() {
        return endorsementService.getAllEndorsements();
    }

    @PostMapping("/endorsements")
    public ResponseEntity<Endorsement> createEndorsement(@Valid @RequestBody EndorsementRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(endorsementService.addEndorsement(request));
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, Object>> submitContact(@Valid @RequestBody ContactRequest request) {
        ContactMessage saved = contactService.submitMessage(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "id", saved.getId(),
                "message", "Thank you! Your message has been saved and will be reviewed shortly.",
                "createdAt", saved.getCreatedAt()
        ));
    }

    @GetMapping("/resume/download")
    public ResponseEntity<Resource> downloadResume() {
        Resource pdf = new ClassPathResource("static/resume/Sreeja_Myadari_Resume_SE.pdf");
        if (!pdf.exists()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"Sreeja_Myadari_Resume_SE.pdf\"")
                .body(pdf);
    }
}
