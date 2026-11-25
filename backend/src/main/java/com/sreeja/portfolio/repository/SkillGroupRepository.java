package com.sreeja.portfolio.repository;

import com.sreeja.portfolio.model.SkillGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Data access layer for categorized skill groups.
 */
public interface SkillGroupRepository extends JpaRepository<SkillGroup, Long> {
    List<SkillGroup> findAllByOrderByDisplayOrderAscIdAsc();
}
