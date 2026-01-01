# How to Run Your Travel App

Your app code is fully set up in the `NewTravelApp` folder! However, your computer is missing the **Android SDK**, which is required to run Android apps.

## Step 1: Install Android Studio
1. Download **Android Studio** from [developer.android.com/studio](https://developer.android.com/studio).
2. Install it. During installation, make sure to check the box for **"Android SDK"** and **"Android Virtual Device"**.
3. Open Android Studio and let it finish downloading the SDK components.

## Step 2: Configure Environment
1. Open your Start Menu and search for "Edit the system environment variables".
2. Click **Environment Variables**.
3. Under "User variables", look for `ANDROID_HOME`. If it's missing, click **New**:
   - Variable name: `ANDROID_HOME`
   - Variable value: `C:\Users\swali\AppData\Local\Android\Sdk` (or wherever Android Studio installed the SDK).

## Step 3: Run the App
1. Open a terminal in this folder (`TravelFares\screens\NewTravelApp`).
2. Run this command to start the server:
   ```powershell
   npx react-native start
   ```
3. Open a **second** terminal and run:
   ```powershell
   npx react-native run-android
   ```

The app will then launch on your emulator!
