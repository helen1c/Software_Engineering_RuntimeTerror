package hr.fer.pi.planinarskidnevnik.security;

public abstract class SecurityConstants {
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final Long EXPIRATION_TIME = 10 * 24 * 60 * 60 * 1000L;
}
