package com.sreeja.portfolio.repository;

import com.sreeja.portfolio.model.Project;
import com.sreeja.portfolio.model.ProjectCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Data access layer for portfolio projects.
 */
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByOrderByDisplayOrderAscIdAsc();
    List<Project> findByCategoryOrderByDisplayOrderAscIdAsc(ProjectCategory category);
}
