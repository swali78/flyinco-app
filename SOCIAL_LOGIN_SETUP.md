# Social Login Setup Guide

To enable Google and Facebook login in your Travel App, you need to configure the external provider credentials.

## 1. Google Login Setup

### Step A: Firebase Console
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project (or use an existing one).
3. Add an Android App to the project.
   - **Package Name**: `com.newtravelapp` (You can check this in `android/app/build.gradle`).
   - Download the **`google-services.json`** file.
4. **Action Required**: Place the `google-services.json` file into `c:\RNA APPS\NewTravelApp\android\app\`.

### Step B: Enable Authentication
1. In Firebase Console, go to **Build > Authentication**.
2. Click **Get Started**.
3. Enable **Google** as a Sign-in method.
4. In the Google configuration, copy the **Web Client ID**.

### Step C: Update App Config
1. Open `src/config/env.js`.
2. Replace `GOOGLE_WEB_CLIENT_ID` with the ID you copied from Firebase.

### Step D: Update Gradle Scripts
1. Open `android/build.gradle` and add this classpath under dependencies:
   ```gradle
   classpath('com.google.gms:google-services:4.4.1')
   ```
2. Open `android/app/build.gradle` and add this plugin at the very top:
   ```gradle
   apply plugin: 'com.google.gms.google-services'
   ```

---

## 2. Facebook Login Setup

### Step A: Facebook Developers
1. Go to [developers.facebook.com](https://developers.facebook.com/).
2. Create a new App (Select "Authenticate and request data from users").
3. Go to **Settings > Basic**.
4. Copy the **App ID** and **Client Token** (found under Advanced Settings > Security).

### Step B: Update Configuration
1. Open `android/app/src/main/res/values/strings.xml`.
2. Update the following values:
   - `facebook_app_id`: Your App ID.
   - `fb_login_protocol_scheme`: `fb` + Your App ID (e.g., `fb123456789`).
   - `facebook_client_token`: Your Client Token.
3. Open `src/config/env.js` and paste your App ID and Client Token there as well.

### Step C: Android Key Hash
1. You may need to generate a development key hash and add it to your Facebook App settings under "Android".
   - Run this command in your terminal (Windows):
     ```powershell
     keytool -exportcert -alias androiddebugkey -keystore "C:\Users\YOUR_USER\.android\debug.keystore" | openssl sha1 -binary | openssl base64
     ```
   - Password is usually `android`.

---

## 3. Final Step
Once you have placed the files and updated the keys:
1. Run `cd android && ./gradlew clean`
2. Run `npm run android` to rebuild the app with the new configuration.
