/**
 * Validation utilities
 * Form validation functions for email, password, etc.
 */

/**
 * Validate email format
 */
export const validateEmail = (email) => {
    if (!email) {
        return 'Email is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    
    return null; // Valid
};

/**
 * Validate password
 */
export const validatePassword = (password) => {
    if (!password) {
        return 'Password is required';
    }
    
    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }
    
    return null; // Valid
};

/**
 * Validate name
 */
export const validateName = (name) => {
    if (!name) {
        return 'Name is required';
    }
    
    if (name.length < 2) {
        return 'Name must be at least 2 characters';
    }
    
    return null; // Valid
};

/**
 * Validate login form
 */
export const validateLoginForm = (email, password) => {
    const errors = {};
    
    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;
    
    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validate registration form
 */
export const validateRegisterForm = (formData) => {
    const errors = {};
    
    const nameError = validateName(formData.name);
    if (nameError) errors.name = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;
    
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
