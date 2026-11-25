package com.sreeja.portfolio.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents a software or engineering project stored in the database.
 */
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 140)
    private String title;

    @Column(nullable = false, length = 180)
    private String tagline;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ProjectCategory category;

    @Column(nullable = false, length = 1200)
    private String summary;

    @Column(length = 800)
    private String architectureNotes;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_highlights", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "highlight", length = 400)
    private List<String> highlights = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_tech_stack", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "technology", length = 60)
    private List<String> techStack = new ArrayList<>();

    @Column(length = 255)
    private String repoUrl;

    @Column(length = 255)
    private String liveUrl;

    @Column(nullable = false)
    private boolean featured = false;

    @Column(nullable = false)
    private int likesCount = 0;

    @Column(nullable = false)
    private int displayOrder = 0;

    public Project() {
    }

    public Project(String title, String tagline, ProjectCategory category, String summary,
                   String architectureNotes, List<String> highlights, List<String> techStack,
                   String repoUrl, String liveUrl, boolean featured, int likesCount, int displayOrder) {
        this.title = title;
        this.tagline = tagline;
        this.category = category;
        this.summary = summary;
        this.architectureNotes = architectureNotes;
        this.highlights = highlights != null ? new ArrayList<>(highlights) : new ArrayList<>();
        this.techStack = techStack != null ? new ArrayList<>(techStack) : new ArrayList<>();
        this.repoUrl = repoUrl;
        this.liveUrl = liveUrl;
        this.featured = featured;
        this.likesCount = likesCount;
        this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }
    public ProjectCategory getCategory() { return category; }
    public void setCategory(ProjectCategory category) { this.category = category; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getArchitectureNotes() { return architectureNotes; }
    public void setArchitectureNotes(String architectureNotes) { this.architectureNotes = architectureNotes; }
    public List<String> getHighlights() { return highlights; }
    public void setHighlights(List<String> highlights) { this.highlights = highlights; }
    public List<String> getTechStack() { return techStack; }
    public void setTechStack(List<String> techStack) { this.techStack = techStack; }
    public String getRepoUrl() { return repoUrl; }
    public void setRepoUrl(String repoUrl) { this.repoUrl = repoUrl; }
    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
    public int getLikesCount() { return likesCount; }
    public void setLikesCount(int likesCount) { this.likesCount = likesCount; }
    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
}
