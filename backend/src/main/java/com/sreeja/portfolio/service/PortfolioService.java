package com.sreeja.portfolio.service;

import com.sreeja.portfolio.dto.PortfolioResponse;
import com.sreeja.portfolio.dto.ProfileDto;
import com.sreeja.portfolio.dto.ProjectCreateRequest;
import com.sreeja.portfolio.exception.ResourceNotFoundException;
import com.sreeja.portfolio.model.Project;
import com.sreeja.portfolio.model.ProjectCategory;
import com.sreeja.portfolio.model.TimelineType;
import com.sreeja.portfolio.repository.EndorsementRepository;
import com.sreeja.portfolio.repository.ProjectRepository;
import com.sreeja.portfolio.repository.SkillGroupRepository;
import com.sreeja.portfolio.repository.TimelineItemRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Coordinates portfolio queries, project filtering, appreciation updates, and owner CRUD.
 */
@Service
public class PortfolioService {

    private final ProjectRepository projectRepository;
    private final SkillGroupRepository skillGroupRepository;
    private final TimelineItemRepository timelineItemRepository;
    private final EndorsementRepository endorsementRepository;
    private final String linkedinUrl;
    private final String githubUrl;

    public PortfolioService(
            ProjectRepository projectRepository,
            SkillGroupRepository skillGroupRepository,
            TimelineItemRepository timelineItemRepository,
            EndorsementRepository endorsementRepository,
            @Value("${portfolio.profile.linkedin}") String linkedinUrl,
            @Value("${portfolio.profile.github}") String githubUrl) {
        this.projectRepository = projectRepository;
        this.skillGroupRepository = skillGroupRepository;
        this.timelineItemRepository = timelineItemRepository;
        this.endorsementRepository = endorsementRepository;
        this.linkedinUrl = linkedinUrl;
        this.githubUrl = githubUrl;
    }

    @Transactional(readOnly = true)
    public PortfolioResponse getFullPortfolio() {
        return new PortfolioResponse(
                buildProfile(),
                skillGroupRepository.findAllByOrderByDisplayOrderAscIdAsc(),
                projectRepository.findAllByOrderByDisplayOrderAscIdAsc(),
                timelineItemRepository.findByTypeOrderByDisplayOrderAscIdAsc(TimelineType.EXPERIENCE),
                timelineItemRepository.findByTypeOrderByDisplayOrderAscIdAsc(TimelineType.EDUCATION),
                timelineItemRepository.findByTypeOrderByDisplayOrderAscIdAsc(TimelineType.CERTIFICATION),
                endorsementRepository.findAllByOrderByCreatedAtDesc()
        );
    }

    @Transactional(readOnly = true)
    public List<Project> getProjects(String categoryParam) {
        if (categoryParam == null || categoryParam.isBlank() || categoryParam.equalsIgnoreCase("ALL")) {
            return projectRepository.findAllByOrderByDisplayOrderAscIdAsc();
        }
        try {
            ProjectCategory category = ProjectCategory.valueOf(categoryParam.trim().toUpperCase());
            return projectRepository.findByCategoryOrderByDisplayOrderAscIdAsc(category);
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Unknown project category: " + categoryParam);
        }
    }

    @Transactional
    public Project incrementProjectLike(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + projectId));
        project.setLikesCount(project.getLikesCount() + 1);
        return projectRepository.save(project);
    }

    @Transactional
    public Project createProject(ProjectCreateRequest request) {
        int nextOrder = (int) projectRepository.count() + 1;
        Project project = new Project(
                request.title().trim(),
                request.tagline().trim(),
                request.category(),
                request.summary().trim(),
                request.architectureNotes() != null ? request.architectureNotes().trim() : "",
                request.highlights() != null ? request.highlights() : List.of(),
                request.techStack(),
                request.repoUrl(),
                request.liveUrl(),
                request.featured(),
                0,
                nextOrder
        );
        return projectRepository.save(project);
    }

    @Transactional
    public void deleteProject(Long projectId) {
        if (!projectRepository.existsById(projectId)) {
            throw new ResourceNotFoundException("Project not found with id: " + projectId);
        }
        projectRepository.deleteById(projectId);
    }

    private ProfileDto buildProfile() {
        return new ProfileDto(
                "Sreeja Myadari",
                "Software Engineer",
                "Designing resilient REST APIs with Java & Spring Boot, paired with clean React interfaces.",
                "Software Engineer with hands-on project experience designing, coding, and enhancing REST API-driven components using Java and Spring Boot. Skilled in API design, integration, and full-stack development, with a solid grounding in SDLC and agile delivery.",
                "Hyderabad, India",
                "myadarisreeja02@gmail.com",
                "+91 8019285155",
                linkedinUrl,
                githubUrl,
                List.of("Quick Learner", "Agile Collaboration", "API-First Problem Solving", "Clean Documentation"),
                List.of("Mandala Art", "Listening to Music", "Exploring New Technologies")
        );
    }
}
