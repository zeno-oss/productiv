# Mobile App (iOS/Android)

```yml
notes:
  - brief summary: why was react-native included in Zeno Stack?; what's new with expo and eas nowadays?
  - example: generate an OAuth Client ID with Google + .env config
  - example: build process (expo, eas, etc.)
  - explain: auth flow (iOS/android/web vs desktop/web)
```

## 🦮 Android Development on Windows 11

If...

- you can't install xcode because you went big on Bill's new OS...
- you can't use your cellphone because you're a simp for Tim Cook...
- you're new to Android development and have no idea what's going on...

then this guide is for you.

### Download and install Android Studio >=3.0

If you don't have the android sdk, get the latest version of [Android Studio](https://developer.android.com/studio) and follow these instructions.

1. Start the installation wizard and select **\[Standard** installation].
2. After the installation is complete, launch Android Studio.
3. In the sidebar, click **\[Customize**] and then **\[All settings...]**.
4. Navigate to: **_Appearance & Behavior > System Settings > Android SDK > <u>SDK Tools</u>_**.
5. Copy the Android SDK location to your clipboard for later use.
6. Checkmark the build-tools package. If you would like to use a virtual machine (recommended), install the emulator and platform-tools as well.

   - [x] Android SDK Build-Tools
   - [x] Android Emulator
   - [x] Android SDK Platform-Tools

7. Click **\[Apply**] and then **\[OK]**.

### Add the Android SDK to PATH variables

1. `WinKey`+`S` and begin typing "edit environment variables for your account" and open the Environment Variables dialog box.

2. Add the Android SDK's path to your **User variables** by clicking **\[New...]**

   ```yml
   variable name: ANDROID_HOME
   variable value: %USERPROFILE%\AppData\Local\Android\Sdk
   ```

   > If you installed Android Studio somewhere else, use that location instead.

3. Click **\[OK]**.

4. If you installed `platform-tools`, append them to your `Path` and click **\[Edit...]** then **\[New]**

   ```yml
   %ANDROID_HOME%\platform-tools
   ```

5. Click **\[OK**] twice.

### Create an Android Virtual Device (AVD)

Go back into Android Studio's welcome screen and use the kebab menu to open the **\[Virtual Device Manager]**. We're going to create a virtual machine for our app to run on. The default settings are sufficient for development.

1. Click **\[Create device]**.
2. Configure your AVD, clicking **\[Next**] until the button is disabled.
3. Give your AVD a name and click **\[Finish]**.

### ▶️ Run your app the AVD

#### Option A - Expo cli/app login (recommended)

`# TODO`

#### Option B - Tunnel developer builds over VM (not recommended)

If you have firewall issues or restrictions, you can start expo with the `--tunnel` flag to tunnel your app over ngrok. This is not recommended, but it's an option.

> Be aware of the security implications of using ngrok. <u>You are exposing your local network to the internet.</u>

1. navigate to the mobile workspace

   ```bash
   cd <YOUR-REPO>\apps\mobile
   ```

2. Install `@expo/ngrok` as a devDependency

   ```ps1
   yarn add @expo/ngrok -D
   ```

3. <u>**With expo**</u>, Install `expo-application` as a devDependency. Expo uses your project's package manager to install the package.

   ```ps1
   expo install expo-application -- -D
   ```

## 💄 Making it yours

### Android Package Name

Your app's package name is required to generate OAuth Client IDs from Google. Open `./app.json` and `CTRL`+`H` to find and replace `"productiv"` with your app's name.

> The package name of your android app must be unique on the Google Play store. We're using our own package name, and you should too before attempting publishing your app.
>
> #### app.json
>
> ```json
> {
>   "name": "myandroidapp",
>   "slug": "myandroidapp",
>   "scheme": "myandroidapp",
>   // ...
>   "android": {
>     "package": "com.myorg.myandroidapp"
>     // ...
>   }
> }
> ```

### OAuth Client IDs (Google)

`# TODO`
