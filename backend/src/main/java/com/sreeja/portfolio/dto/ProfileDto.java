package com.sreeja.portfolio.dto;

import java.util.List;

/**
 * Owner profile metadata returned in the aggregated portfolio payload.
 */
public record ProfileDto(
        String fullName,
        String roleTitle,
        String headline,
        String summary,
        String location,
        String email,
        String phone,
        String linkedinUrl,
        String githubUrl,
        List<String> strengths,
        List<String> interests
) {}
