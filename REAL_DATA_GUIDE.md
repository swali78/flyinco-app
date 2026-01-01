# How to Get Real Flight Data (Amadeus API Integration)

To show real flight prices and schedules, we need to connect your app to a Flight Search API. The best option for developers is **Amadeus**.

## Step 1: Get API Keys
1.  Go to [Amadeus for Developers](https://developers.amadeus.com/).
2.  Click **Register** and create an account.
3.  Go to **My Self-Service Workspace** > **Create New App**.
4.  Name it "NewTravelApp" and click **Create**.
5.  You will see an **API Key** (Client ID) and **API Secret** (Client Secret). 
    *   **Copy these keys.**

## Step 2: Configure Your App
I have updated your `src/config/env.js` file. You need to paste your keys there.

```javascript
/* src/config/env.js */
export default {
    // ... existing config
    AMADEUS_CLIENT_ID: 'PASTE_YOUR_API_KEY_HERE',
    AMADEUS_CLIENT_SECRET: 'PASTE_YOUR_API_SECRET_HERE',
};
```

## Step 3: We Will Update the Code
Once you have pasted your keys, I will write the code to:
1.  Authentic with Amadeus (get an access token).
2.  Call the `Flight Offers Search` API when you search in the app.
3.  Format the real data to look like our beautiful UI.

## Limitations
*   **Test Environment**: The free Amadeus account is a "Test" environment. It has limited data (specific airlines and routes may be limited), but it works for development.
*   **Backend Recommended**: In a production app, you should not store these keys in the React Native app directly. You should have a Node.js server to handle them. For now, we can put them in the app for testing.

**Ready?** 
1. Get your keys.
2. Paste them into `src/config/env.js`.
3. Tell me **"I have added the keys"**, and I will implement the API calls!
