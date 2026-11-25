package com.sreeja.portfolio.exception;

/**
 * Thrown when a requested portfolio entity cannot be found in the database.
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
