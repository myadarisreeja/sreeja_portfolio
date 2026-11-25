package com.sreeja.portfolio;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests verifying Spring Boot REST endpoints, JPA persistence, and validation.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PortfolioIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void healthAndPortfolioSeededCorrectly() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.projectsCount", greaterThanOrEqualTo(6)));

        mockMvc.perform(get("/api/portfolio"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.profile.fullName").value("Sreeja Myadari"))
                .andExpect(jsonPath("$.profile.linkedinUrl").value("https://www.linkedin.com/in/myadari-sreeja-005432318/"))
                .andExpect(jsonPath("$.profile.githubUrl").value("https://github.com/myadarisreeja"))
                .andExpect(jsonPath("$.projects", hasSize(greaterThanOrEqualTo(6))))
                .andExpect(jsonPath("$.skillGroups", hasSize(5)))
                .andExpect(jsonPath("$.experiences", hasSize(1)))
                .andExpect(jsonPath("$.education", hasSize(3)))
                .andExpect(jsonPath("$.certifications", hasSize(3)));
    }

    @Test
    void filterProjectsAndLikePersists() throws Exception {
        mockMvc.perform(get("/api/projects").param("category", "FULL_STACK"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("AI Mock Interview Platform"));

        mockMvc.perform(post("/api/projects/1/like"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.likesCount", greaterThanOrEqualTo(19)));
    }

    @Test
    void contactValidationAndAdminInboxFlow() throws Exception {
        // Invalid payload -> 400 with fieldErrors
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"senderName":"","senderEmail":"not-an-email","subject":"Hi","message":"short"}
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors.senderEmail").exists());

        // Valid payload -> 201 Created
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"senderName":"Recruiter","senderEmail":"recruiter@example.com","subject":"Java Role","message":"Impressed by your Spring Boot API architecture."}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists());

        // Admin without key -> 401
        mockMvc.perform(get("/api/admin/messages"))
                .andExpect(status().isUnauthorized());

        // Admin with valid test key -> 200 and message present
        mockMvc.perform(get("/api/admin/messages")
                        .header("X-Admin-Key", "test-admin-key"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].senderEmail").value("recruiter@example.com"));
    }

    @Test
    void guestbookEndorsementFlow() throws Exception {
        mockMvc.perform(post("/api/endorsements")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"authorName":"Ananya","authorRole":"Tech Lead","comment":"Very clean API design and responsive React UI!"}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.authorName").value("Ananya"));

        mockMvc.perform(get("/api/endorsements"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].authorName").value("Ananya"));
    }

    @Test
    void resumePdfDownloadWorks() throws Exception {
        mockMvc.perform(get("/api/resume/download"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_PDF));
    }
}
