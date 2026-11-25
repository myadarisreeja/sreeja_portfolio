package com.sreeja.portfolio.model;

import jakarta.persistence.*;
import java.time.Instant;

/**
 * Persists visitor guestbook notes and endorsements in the database.
 */
@Entity
@Table(name = "endorsements")
public class Endorsement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String authorName;

    @Column(nullable = false, length = 100)
    private String authorRole;

    @Column(nullable = false, length = 500)
    private String comment;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    public Endorsement() {
    }

    public Endorsement(String authorName, String authorRole, String comment) {
        this.authorName = authorName;
        this.authorRole = authorRole;
        this.comment = comment;
    }

    @PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
    }

    public Long getId() { return id; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
    public String getAuthorRole() { return authorRole; }
    public void setAuthorRole(String authorRole) { this.authorRole = authorRole; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public Instant getCreatedAt() { return createdAt; }
}
