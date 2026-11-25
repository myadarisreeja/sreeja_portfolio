package com.sreeja.portfolio.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents an internship, education credential, or certification entry.
 */
@Entity
@Table(name = "timeline_items")
public class TimelineItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TimelineType type;

    @Column(nullable = false, length = 160)
    private String title;

    @Column(nullable = false, length = 160)
    private String organization;

    @Column(nullable = false, length = 60)
    private String period;

    @Column(length = 80)
    private String badgeMetric;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "timeline_highlights", joinColumns = @JoinColumn(name = "timeline_id"))
    @Column(name = "highlight", length = 350)
    private List<String> highlights = new ArrayList<>();

    @Column(nullable = false)
    private int displayOrder;

    public TimelineItem() {
    }

    public TimelineItem(TimelineType type, String title, String organization, String period,
                        String badgeMetric, List<String> highlights, int displayOrder) {
        this.type = type;
        this.title = title;
        this.organization = organization;
        this.period = period;
        this.badgeMetric = badgeMetric;
        this.highlights = highlights != null ? new ArrayList<>(highlights) : new ArrayList<>();
        this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public TimelineType getType() { return type; }
    public void setType(TimelineType type) { this.type = type; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }
    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }
    public String getBadgeMetric() { return badgeMetric; }
    public void setBadgeMetric(String badgeMetric) { this.badgeMetric = badgeMetric; }
    public List<String> getHighlights() { return highlights; }
    public void setHighlights(List<String> highlights) { this.highlights = highlights; }
    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
}
