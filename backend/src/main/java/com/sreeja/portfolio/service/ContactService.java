package com.sreeja.portfolio.service;

import com.sreeja.portfolio.dto.ContactRequest;
import com.sreeja.portfolio.exception.ResourceNotFoundException;
import com.sreeja.portfolio.model.ContactMessage;
import com.sreeja.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Handles validation-backed storage and owner inbox management for contact messages.
 */
@Service
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @Transactional
    public ContactMessage submitMessage(ContactRequest request) {
        ContactMessage entity = new ContactMessage(
                request.senderName().trim(),
                request.senderEmail().trim(),
                request.subject().trim(),
                request.message().trim()
        );
        return contactMessageRepository.save(entity);
    }

    @Transactional(readOnly = true)
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional
    public ContactMessage markAsRead(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + id));
        message.setReadStatus(true);
        return contactMessageRepository.save(message);
    }

    @Transactional
    public void deleteMessage(Long id) {
        if (!contactMessageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Message not found with id: " + id);
        }
        contactMessageRepository.deleteById(id);
    }
}
