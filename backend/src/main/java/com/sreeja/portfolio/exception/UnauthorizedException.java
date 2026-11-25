package com.sreeja.portfolio.exception;

/**
 * Thrown when an admin endpoint is invoked without a valid owner key.
 */
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}
