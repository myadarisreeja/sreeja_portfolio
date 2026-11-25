package com.sreeja.portfolio.config;

import com.sreeja.portfolio.model.*;
import com.sreeja.portfolio.repository.EndorsementRepository;
import com.sreeja.portfolio.repository.ProjectRepository;
import com.sreeja.portfolio.repository.SkillGroupRepository;
import com.sreeja.portfolio.repository.TimelineItemRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

/**
 * Populates the relational database with Sreeja Myadari's resume data on initial startup.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final ProjectRepository projectRepository;
    private final SkillGroupRepository skillGroupRepository;
    private final TimelineItemRepository timelineItemRepository;
    private final EndorsementRepository endorsementRepository;
    private final String githubUrl;

    public DataSeeder(
            ProjectRepository projectRepository,
            SkillGroupRepository skillGroupRepository,
            TimelineItemRepository timelineItemRepository,
            EndorsementRepository endorsementRepository,
            @Value("${portfolio.profile.github}") String githubUrl) {
        this.projectRepository = projectRepository;
        this.skillGroupRepository = skillGroupRepository;
        this.timelineItemRepository = timelineItemRepository;
        this.endorsementRepository = endorsementRepository;
        this.githubUrl = githubUrl;
    }

    @Override
    public void run(String... args) {
        seedSkills();
        seedProjects();
        seedTimeline();
        seedInitialGuestbookNote();
    }

    private void seedSkills() {
        if (skillGroupRepository.count() > 0) {
            return;
        }
        skillGroupRepository.saveAll(List.of(
                new SkillGroup(
                        "API Management & Architecture",
                        "api",
                        "Designing structured REST contracts, request-response payloads, error handling, and Postman verification suites.",
                        List.of("RESTful API Design", "API Integration", "Request-Response Handling", "API-Driven Architecture", "Postman Testing"),
                        92,
                        1
                ),
                new SkillGroup(
                        "Java & Backend Frameworks",
                        "server",
                        "Building layered enterprise services, ORM mappings, and clean persistence flows on the JVM.",
                        List.of("Java 21", "Spring Boot", "Hibernate / JPA", "Servlets", "JDBC"),
                        90,
                        2
                ),
                new SkillGroup(
                        "Frontend & Web Engineering",
                        "layout",
                        "Crafting responsive interfaces and interactive client experiences wired seamlessly to REST APIs.",
                        List.of("React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Responsive UI"),
                        86,
                        3
                ),
                new SkillGroup(
                        "Relational Databases",
                        "database",
                        "Modeling normalized schemas, writing optimized SQL queries, and safeguarding transactional integrity.",
                        List.of("MySQL", "Oracle SQL", "Schema Design", "Data Integrity", "H2 Embedded"),
                        88,
                        4
                ),
                new SkillGroup(
                        "Tools, Testing & Delivery",
                        "terminal",
                        "Collaborating across agile SDLC cycles with version control, IDE workflows, and automated QA.",
                        List.of("Git", "GitHub", "Postman", "Selenium", "Eclipse", "VS Code", "Agile SDLC"),
                        85,
                        5
                )
        ));
    }

    private void seedProjects() {
        if (projectRepository.count() > 0) {
            return;
        }
        projectRepository.saveAll(List.of(
                new Project(
                        "AI Mock Interview Platform",
                        "Full-stack job portal & AI interview preparation engine",
                        ProjectCategory.FULL_STACK,
                        "End-to-end full-stack platform integrating a React frontend with a Java Spring Boot backend, MySQL persistence, and the Gemini API for realistic interview preparation.",
                        "Layered Spring Boot REST API gateway orchestrating role-based Admin/User access, structured DTO validation, global error handling, and external Gemini API calls.",
                        List.of(
                                "Integrated RESTful APIs using Spring Boot connecting the React frontend, backend, and Gemini API.",
                                "Built a full-stack job portal with role-based authentication for Admin and User roles.",
                                "Engineered a scalable API architecture with structured request-response handling and error handling."
                        ),
                        List.of("Java", "Spring Boot", "React", "MySQL", "Gemini API", "REST API"),
                        githubUrl,
                        null,
                        true,
                        18,
                        1
                ),
                new Project(
                        "ATS Resume Analyzer",
                        "Interactive DOCX/PDF resume parser & job-match scoring tool",
                        ProjectCategory.WEB_TOOL,
                        "Browser-based ATS compatibility tool that parses DOCX and PDF resumes, compares extracted skills against target job descriptions, and visualizes keyword gaps.",
                        "Client-side document parsing pipeline paired with deterministic keyword normalization and instant visual match-score breakdown.",
                        List.of(
                                "Built a web-based analyzer to parse DOCX/PDF resumes and compare them against job descriptions.",
                                "Generated skill-match scoring with an interactive UI highlighting matched and missing keywords."
                        ),
                        List.of("HTML5", "CSS3", "JavaScript", "Document Parsing", "UI/UX"),
                        githubUrl,
                        null,
                        true,
                        12,
                        2
                ),
                new Project(
                        "Library Management System",
                        "Normalized relational database & transaction integrity suite",
                        ProjectCategory.DATABASE,
                        "Relational database architecture designed to manage book catalogs, member registrations, borrowing lifecycles, and fine calculations with strict referential integrity.",
                        "3NF normalized SQL schema enforcing foreign-key constraints, transaction-safe issue/return queries, and audit-friendly member records.",
                        List.of(
                                "Built a relational database to track books, members, and transactions with strong data integrity.",
                                "Designed normalized schemas and structured SQL queries for inventory and circulation tracking."
                        ),
                        List.of("SQL", "MySQL", "Oracle SQL", "Relational Modeling"),
                        githubUrl,
                        null,
                        false,
                        9,
                        3
                ),
                new Project(
                        "Smart Zebra Crossing",
                        "Automated pedestrian safety signaling system",
                        ProjectCategory.HARDWARE_IOT,
                        "Embedded Arduino safety prototype automating pedestrian crosswalk signals and LED visibility cues to improve road safety.",
                        "Microcontroller state machine coordinating sensor input triggers with timed traffic and crosswalk LED arrays.",
                        List.of(
                                "Automated pedestrian safety signaling system built using Arduino microcontroller logic and LED indicators."
                        ),
                        List.of("Arduino", "Embedded C", "LED Signaling", "Hardware Prototyping"),
                        githubUrl,
                        null,
                        false,
                        7,
                        4
                ),
                new Project(
                        "Password-based Circuit Breaker",
                        "Keypad-authenticated electrical load protection unit",
                        ProjectCategory.HARDWARE_IOT,
                        "Secure electrical circuit control system requiring keypad password authentication before energizing or isolating connected loads.",
                        "Relay switching interface gated by Arduino keypad matrix verification to prevent unauthorized line activation.",
                        List.of(
                                "Implemented secure power control with keypad-based authentication using Arduino."
                        ),
                        List.of("Arduino", "Keypad Auth", "Electrical Safety", "Embedded Systems"),
                        githubUrl,
                        null,
                        false,
                        6,
                        5
                ),
                new Project(
                        "Collision Detection with GSM-GPS",
                        "Real-time accident detection & emergency SMS alert system",
                        ProjectCategory.HARDWARE_IOT,
                        "Automated vehicle collision sensing module paired with GPS coordinate capture and GSM emergency alert dispatch.",
                        "Impact sensor interrupt workflow reading live NMEA GPS coordinates and dispatching SMS notifications via GSM modem.",
                        List.of(
                                "Engineered an automated accident detection and location alert pipeline using Arduino, GSM, and GPS modules."
                        ),
                        List.of("Arduino", "GSM", "GPS", "Sensors", "IoT"),
                        githubUrl,
                        null,
                        false,
                        11,
                        6
                )
        ));
    }

    private void seedTimeline() {
        if (timelineItemRepository.count() > 0) {
            return;
        }
        timelineItemRepository.saveAll(List.of(
                // Experience / Course
                new TimelineItem(
                        TimelineType.EXPERIENCE,
                        "Full Stack Java Intern",
                        "JSpiders Training Institute",
                        "Jul 2025 – Feb 2026",
                        "Java • Servlets • JDBC • MySQL",
                        List.of(
                                "Implemented RESTful APIs using Java, Servlets, and JDBC with CRUD operations and MySQL integration.",
                                "Built responsive front-end components with HTML, CSS, and JavaScript consuming backend REST APIs.",
                                "Collaborated in an agile environment, translating requirements into working, documented software."
                        ),
                        1
                ),
                // Education
                new TimelineItem(
                        TimelineType.EDUCATION,
                        "B.Tech, Electrical and Electronics Engineering",
                        "St. Peter's Engineering College, Hyderabad",
                        "2022 – 2025",
                        "CGPA: 8.85",
                        List.of("Combined core engineering discipline with software engineering, data structures, and full-stack project delivery."),
                        2
                ),
                new TimelineItem(
                        TimelineType.EDUCATION,
                        "Diploma, Electrical and Electronics Engineering",
                        "JNGP College, Hyderabad",
                        "2019 – 2022",
                        "92%",
                        List.of("Strong foundation in hardware-software interfacing, circuit systems, and analytical problem solving."),
                        3
                ),
                new TimelineItem(
                        TimelineType.EDUCATION,
                        "SSC (Secondary School Certificate)",
                        "Krishnaveni Talent School, Kamareddy",
                        "2019",
                        "CGPA: 9.2",
                        List.of("Academic excellence with strong grounding in mathematics and science."),
                        4
                ),
                // Certifications
                new TimelineItem(
                        TimelineType.CERTIFICATION,
                        "Data Structures & Algorithms in Java",
                        "Infosys Springboard",
                        "Sep 2023",
                        "Verified",
                        List.of("Core algorithmic problem solving, collections, trees, recursion, and complexity analysis in Java."),
                        5
                ),
                new TimelineItem(
                        TimelineType.CERTIFICATION,
                        "Introduction to Software Engineering",
                        "IBM",
                        "May 2023",
                        "Verified",
                        List.of("Software development lifecycle, architecture fundamentals, testing practices, and agile teamwork."),
                        6
                ),
                new TimelineItem(
                        TimelineType.CERTIFICATION,
                        "Web Development with HTML & CSS",
                        "Data Flair",
                        "May 2023",
                        "Verified",
                        List.of("Semantic HTML5 structure, responsive CSS layouts, and modern web styling foundations."),
                        7
                )
        ));
    }

    private void seedInitialGuestbookNote() {
        if (endorsementRepository.count() > 0) {
            return;
        }
        endorsementRepository.save(new Endorsement(
                "Sreeja Myadari",
                "Software Engineer & Portfolio Author",
                "Welcome to my full-stack portfolio! Every project, skill, guestbook note, and inquiry here is served by a Java 21 Spring Boot REST API and persisted in a relational database."
        ));
    }
}
