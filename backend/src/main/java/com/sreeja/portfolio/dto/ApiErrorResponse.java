package com.sreeja.portfolio.dto;

import java.time.Instant;
import java.util.Map;

/**
 * Standardized error payload returned by the global exception handler.
 */
public record ApiErrorResponse(
        int status,
        String error,
        String message,
        Map<String, String> fieldErrors,
        Instant timestamp
) {}
