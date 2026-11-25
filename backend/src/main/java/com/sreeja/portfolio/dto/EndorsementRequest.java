package com.sreeja.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Validated request payload for posting a visitor guestbook note.
 */
public record EndorsementRequest(
        @NotBlank(message = "Your name is required")
        @Size(max = 80, message = "Name must not exceed 80 characters")
        String authorName,

        @NotBlank(message = "Role or affiliation is required")
        @Size(max = 100, message = "Role must not exceed 100 characters")
        String authorRole,

        @NotBlank(message = "Note cannot be empty")
        @Size(min = 5, max = 500, message = "Note must be between 5 and 500 characters")
        String comment
) {}
