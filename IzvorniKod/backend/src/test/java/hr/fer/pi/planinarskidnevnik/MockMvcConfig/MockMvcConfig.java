package hr.fer.pi.planinarskidnevnik.MockMvcConfig;

import hr.fer.pi.planinarskidnevnik.models.MountainPathUserArchive.MountainPathUserArchive;
import hr.fer.pi.planinarskidnevnik.services.*;
import hr.fer.pi.planinarskidnevnik.services.impl.CommunityEventService;
import hr.fer.pi.planinarskidnevnik.services.impl.UserDetailsServiceImpl;
import hr.fer.pi.planinarskidnevnik.services.impl.UserService;
import org.mockito.Mock;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;

@TestConfiguration
@ComponentScan(basePackages = { "hr.fer.pi.planinarskidnevnik.*", "hr.fer.pi.planinarskidnevnik.mappers.*" })

public class MockMvcConfig {

    @MockBean
    private MountainLodgeQueryService mountainLodgeQueryService;

    @MockBean
    private UserDetailsService userDetailsService;

    @MockBean
    private WebSecurityConfiguration securityConfiguration;

    @MockBean
    private SecurityAutoConfiguration securityAutoConfiguration;

    @MockBean
    private UserService userService;

    @MockBean
    private CommunityEventService communityEventService;

    @MockBean
    private HillQueryService hillQueryService;

    @MockBean
    private MessageQueryService messageQueryService;

    @MockBean
    private MountainPathQueryService mountainPathQueryService;

    @MockBean
    private UserBadgeService userBadgeService;

    @MockBean
    private UtilityQueryService utilityQueryService;

    @MockBean
    private MountainPathUserArchiveService mountainPathUserArchiveService;

    @MockBean
    private MountainLodgeUserArchiveService mountainLodgeUserArchiveService;

    @MockBean
    private UserDetailsServiceImpl  userDetailsServiceImpl;

    @MockBean
    private AuthenticationManagerBuilder authenticationManagerBuilder;

}
