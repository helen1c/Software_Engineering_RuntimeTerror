package hr.fer.pi.planinarskidnevnik.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

import static hr.fer.pi.planinarskidnevnik.security.SecurityConstants.*;

/**
 * JWT authorization filter
 */
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
    public JWTAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager, AuthenticationEntryPoint authenticationEntryPoint) {
        super(authenticationManager, authenticationEntryPoint);
    }

    private static UsernamePasswordAuthenticationToken getPasswordAuthenticationToken(HttpServletRequest request) {
        final String token = request.getHeader(HEADER_STRING);
        UsernamePasswordAuthenticationToken passwordAuthenticationToken = null;

        try {
            if (token != null) {
                final String user = JWT.require(Algorithm.HMAC512(SECRET.getBytes())).build().verify(token.replace(TOKEN_PREFIX, "")).getSubject();
                if (user != null) {
                    passwordAuthenticationToken = new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
                }
            }
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }

        return passwordAuthenticationToken;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        final String header = request.getHeader(HEADER_STRING);
        if (header != null && header.startsWith(TOKEN_PREFIX)) {
            final UsernamePasswordAuthenticationToken authenticationToken = getPasswordAuthenticationToken(request);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        chain.doFilter(request, response);
    }
}
