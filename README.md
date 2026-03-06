This project is a cross-platform Library Management System built with [Expo](https://expo.dev/) for React Native. It supports iOS, Android, and web platforms, and is designed for both phones and tablets.

## Features

- Manage library books and users
- Responsive UI for tablets and phones
- Splash screen and custom icons
- Edge-to-edge display on Android
- Expo Router for navigation

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/):  
  ```sh
  npm install -g expo-cli
  ```

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd library_management_system
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```
   or
   ```sh
   yarn
   ```

3. **Start the Expo development server:**
   ```sh
   expo start
   ```

4. **Run on your device or emulator:**
   - **iOS:** Press `i` in the terminal to open in iOS Simulator (Mac only).
   - **Android:** Press `a` to open in Android emulator.
   - **Web:** Press `w` to open in your browser.

   You can also scan the QR code with the Expo Go app on your phone.

## Project Structure

- app.json: Expo configuration ([app.json](j:\library_management_system\app.json))
- assets: Icons, splash images, and favicon
- `src/`: Main source code (components, screens, logic)

## How It Operates

- The app uses Expo Router for navigation.
- On launch, a splash screen is shown.
- The UI adapts for tablets and phones.
- All configuration for icons, splash, and adaptive features is managed in app.json.

## Customization

- Change app name, icons, and splash screen in app.json.
- Add or modify screens in the `src/` directory.

## Troubleshooting

- If you encounter issues, run:
  ```sh
  expo doctor
  ```
---

**Enjoy managing your library with this cross-platform app!**
