package com.sreeja.portfolio.dto;

import com.sreeja.portfolio.model.Endorsement;
import com.sreeja.portfolio.model.Project;
import com.sreeja.portfolio.model.SkillGroup;
import com.sreeja.portfolio.model.TimelineItem;
import java.util.List;

/**
 * Aggregated API payload delivering all portfolio sections in a single round trip.
 */
public record PortfolioResponse(
        ProfileDto profile,
        List<SkillGroup> skillGroups,
        List<Project> projects,
        List<TimelineItem> experiences,
        List<TimelineItem> education,
        List<TimelineItem> certifications,
        List<Endorsement> endorsements
) {}
