package com.sreeja.portfolio.repository;

import com.sreeja.portfolio.model.Endorsement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Data access layer for visitor endorsements and guestbook notes.
 */
public interface EndorsementRepository extends JpaRepository<Endorsement, Long> {
    List<Endorsement> findAllByOrderByCreatedAtDesc();
}
