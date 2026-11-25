package com.sreeja.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Validated request payload for submitting a contact message.
 */
public record ContactRequest(
        @NotBlank(message = "Name is required")
        @Size(max = 100, message = "Name must not exceed 100 characters")
        String senderName,

        @NotBlank(message = "Email is required")
        @Email(message = "Please provide a valid email address")
        @Size(max = 140, message = "Email must not exceed 140 characters")
        String senderEmail,

        @NotBlank(message = "Subject is required")
        @Size(max = 160, message = "Subject must not exceed 160 characters")
        String subject,

        @NotBlank(message = "Message cannot be empty")
        @Size(min = 10, max = 2000, message = "Message must be between 10 and 2000 characters")
        String message
) {}
