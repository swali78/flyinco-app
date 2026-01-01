/**
 * Environment configuration
 * API endpoints and configuration values
 * In production, these should come from environment variables
 */

const ENV = {
    // API base URL - replace with your actual backend URL
    API_BASE_URL: __DEV__
        ? 'http://localhost:3000/api' // Development
        : 'https://api.travelfares.com/api', // Production

    // Real Travel Data (Amadeus)
    // Get keys from: https://developers.amadeus.com/
    AMADEUS_CLIENT_ID: 'X053ImqpDpu46ZYLTHaTstZeicVSYABR',
    AMADEUS_CLIENT_SECRET: 'yBu1rg1tqOqVcvvp',

    // API timeout in milliseconds
    API_TIMEOUT: 30000,

    // Feature flags
    ENABLE_SOCIAL_LOGIN: true,
    ENABLE_ANALYTICS: false,

    // Social Login Config (Replace with your actual keys)
    // From Firebase Console -> Authentication -> Sign-in method -> Google -> Web Client ID
    GOOGLE_WEB_CLIENT_ID: 'REPLACE_WITH_YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',

    // From Facebook Developers Console
    FACEBOOK_APP_ID: 'REPLACE_WITH_YOUR_FB_APP_ID',
    FACEBOOK_CLIENT_TOKEN: 'REPLACE_WITH_YOUR_FB_CLIENT_TOKEN',

    // RapidAPI Config (Flightera)
    RAPIDAPI_KEY: 'bd5d7dadc5mshbcd7c7529ccd808p1137f9jsndc87d73b9d87',
    FLIGHTERA_HOST: 'flightera-flight-data.p.rapidapi.com',
};

export default ENV;
