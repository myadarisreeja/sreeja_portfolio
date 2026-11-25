package com.sreeja.portfolio.dto;

import com.sreeja.portfolio.model.ProjectCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

/**
 * Validated payload for creating a new project via the owner admin API.
 */
public record ProjectCreateRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 140)
        String title,

        @NotBlank(message = "Tagline is required")
        @Size(max = 180)
        String tagline,

        @NotNull(message = "Category is required")
        ProjectCategory category,

        @NotBlank(message = "Summary is required")
        @Size(max = 1200)
        String summary,

        @Size(max = 800)
        String architectureNotes,

        List<String> highlights,

        @NotEmpty(message = "At least one technology is required")
        List<String> techStack,

        String repoUrl,
        String liveUrl,
        boolean featured
) {}
