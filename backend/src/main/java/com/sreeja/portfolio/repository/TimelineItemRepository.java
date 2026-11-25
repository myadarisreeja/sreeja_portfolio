package com.sreeja.portfolio.repository;

import com.sreeja.portfolio.model.TimelineItem;
import com.sreeja.portfolio.model.TimelineType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Data access layer for career, education, and certification timeline entries.
 */
public interface TimelineItemRepository extends JpaRepository<TimelineItem, Long> {
    List<TimelineItem> findByTypeOrderByDisplayOrderAscIdAsc(TimelineType type);
    List<TimelineItem> findAllByOrderByDisplayOrderAscIdAsc();
}
