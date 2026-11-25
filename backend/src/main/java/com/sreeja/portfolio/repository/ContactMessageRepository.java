package com.sreeja.portfolio.repository;

import com.sreeja.portfolio.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Data access layer for visitor contact messages.
 */
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findAllByOrderByCreatedAtDesc();
    long countByReadStatusFalse();
}
