package com.sreeja.portfolio.controller;

import com.sreeja.portfolio.dto.ProjectCreateRequest;
import com.sreeja.portfolio.exception.UnauthorizedException;
import com.sreeja.portfolio.model.ContactMessage;
import com.sreeja.portfolio.model.Project;
import com.sreeja.portfolio.service.ContactService;
import com.sreeja.portfolio.service.PortfolioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.List;

/**
 * Passkey-protected owner endpoints for inspecting inbox messages and managing projects.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ContactService contactService;
    private final PortfolioService portfolioService;
    private final String adminKey;

    public AdminController(
            ContactService contactService,
            PortfolioService portfolioService,
            @Value("${portfolio.admin.key}") String adminKey) {
        this.contactService = contactService;
        this.portfolioService = portfolioService;
        this.adminKey = adminKey;
    }

    @GetMapping("/messages")
    public List<ContactMessage> getMessages(@RequestHeader(value = "X-Admin-Key", required = false) String key) {
        authorize(key);
        return contactService.getAllMessages();
    }

    @PatchMapping("/messages/{id}/read")
    public ContactMessage markMessageRead(
            @PathVariable Long id,
            @RequestHeader(value = "X-Admin-Key", required = false) String key) {
        authorize(key);
        return contactService.markAsRead(id);
    }

    @DeleteMapping("/messages/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMessage(
            @PathVariable Long id,
            @RequestHeader(value = "X-Admin-Key", required = false) String key) {
        authorize(key);
        contactService.deleteMessage(id);
    }

    @PostMapping("/projects")
    public ResponseEntity<Project> createProject(
            @Valid @RequestBody ProjectCreateRequest request,
            @RequestHeader(value = "X-Admin-Key", required = false) String key) {
        authorize(key);
        return ResponseEntity.status(HttpStatus.CREATED).body(portfolioService.createProject(request));
    }

    @DeleteMapping("/projects/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProject(
            @PathVariable Long id,
            @RequestHeader(value = "X-Admin-Key", required = false) String key) {
        authorize(key);
        portfolioService.deleteProject(id);
    }

    private void authorize(String providedKey) {
        if (providedKey == null || !MessageDigest.isEqual(
                adminKey.getBytes(StandardCharsets.UTF_8),
                providedKey.getBytes(StandardCharsets.UTF_8))) {
            throw new UnauthorizedException("Invalid or missing owner admin key.");
        }
    }
}
