package com.sreeja.portfolio.service;

import com.sreeja.portfolio.dto.EndorsementRequest;
import com.sreeja.portfolio.model.Endorsement;
import com.sreeja.portfolio.repository.EndorsementRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Manages visitor guestbook notes persisted in the database.
 */
@Service
public class EndorsementService {

    private final EndorsementRepository endorsementRepository;

    public EndorsementService(EndorsementRepository endorsementRepository) {
        this.endorsementRepository = endorsementRepository;
    }

    @Transactional(readOnly = true)
    public List<Endorsement> getAllEndorsements() {
        return endorsementRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional
    public Endorsement addEndorsement(EndorsementRequest request) {
        Endorsement entity = new Endorsement(
                request.authorName().trim(),
                request.authorRole().trim(),
                request.comment().trim()
        );
        return endorsementRepository.save(entity);
    }
}
