/**
 * Global Theme Configuration
 * Centralized colors, fonts, and spacing for the application
 */

export const COLORS = {
    // Primary Branding
    primary: '#4A0E95',
    primaryLight: '#6B2BAB',
    primaryDark: '#320A65',

    // UI Colors
    background: '#FFFFFF',
    surface: '#F8F9FA',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FFCC00',

    // Text Colors
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textOnPrimary: '#FFFFFF',

    // Accents
    border: '#EEEEEE',
    shadow: 'rgba(74, 14, 149, 0.2)',
};

export const FONTS = {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
    light: 'Poppins-Light',
};

export const SHADOWS = {
    light: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    medium: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
};

export default {
    COLORS,
    FONTS,
    SHADOWS,
};
