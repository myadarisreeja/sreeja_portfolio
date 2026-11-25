package com.sreeja.portfolio.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents a categorized technical skill group for the skills matrix.
 */
@Entity
@Table(name = "skill_groups")
public class SkillGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(nullable = false, length = 40)
    private String iconKey;

    @Column(nullable = false, length = 260)
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "skill_group_items", joinColumns = @JoinColumn(name = "skill_group_id"))
    @Column(name = "skill_name", length = 80)
    private List<String> skills = new ArrayList<>();

    @Column(nullable = false)
    private int proficiency;

    @Column(nullable = false)
    private int displayOrder;

    public SkillGroup() {
    }

    public SkillGroup(String category, String iconKey, String description, List<String> skills,
                      int proficiency, int displayOrder) {
        this.category = category;
        this.iconKey = iconKey;
        this.description = description;
        this.skills = skills != null ? new ArrayList<>(skills) : new ArrayList<>();
        this.proficiency = proficiency;
        this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getIconKey() { return iconKey; }
    public void setIconKey(String iconKey) { this.iconKey = iconKey; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }
    public int getProficiency() { return proficiency; }
    public void setProficiency(int proficiency) { this.proficiency = proficiency; }
    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
}
