# 📱 Scholaria — React Native + Expo App

A world-class school management app for Android & iPhone, built with React Native + Expo.

---

## 🗂 Project Structure

```
scholaria-expo/
├── App.js                          ← Entry point
├── app.json                        ← Expo config (name, icons, splash)
├── src/
│   ├── data/
│   │   └── mockData.js             ← All mock data & color tokens
│   ├── components/
│   │   └── UI.js                   ← Shared components (Card, Pill, StatCard...)
│   ├── navigation/
│   │   └── AppNavigator.js         ← Bottom tab nav, role-based tabs, header
│   └── screens/
│       ├── LoginScreen.js          ← Role selector & login
│       ├── DashboardScreen.js      ← 4 role dashboards (student/teacher/head/parent)
│       ├── TimetableScreen.js      ← Weekly timetable with day switcher
│       ├── MessagesScreen.js       ← WhatsApp-style chat
│       └── FeatureScreens.js       ← Attendance, Homework, Bus, Exams, Fees, Gallery, Calendar
```

---

## ⚡ Quickstart (Run on your phone in 5 minutes)

### Step 1 — Install Expo Go on your phone
- Android: [Play Store → Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)
- iPhone: [App Store → Expo Go](https://apps.apple.com/app/expo-go/id982107779)

### Step 2 — Set up on your computer
```bash
# Make sure Node.js is installed (https://nodejs.org)
node --version   # Should be 18+

# Navigate to this folder
cd scholaria-expo

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Step 3 — Open on your phone
- A **QR code** will appear in your terminal
- **Android**: Open Expo Go → Scan QR code
- **iPhone**: Open Camera app → Scan QR code → tap the banner

That's it! The app runs live on your phone. 🎉

---

## 🚀 Build for App Stores

### Option A — Expo EAS Build (Recommended, free tier available)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo (create free account at expo.dev)
eas login

# Configure your project
eas build:configure

# Build for Android (.apk or .aab)
eas build --platform android

# Build for iOS (requires Apple Developer account $99/yr)
eas build --platform ios

# Submit to stores
eas submit --platform android
eas submit --platform ios
```

### Option B — Local Build

```bash
# Android (requires Android Studio + Java 17)
npx expo run:android

# iOS (requires macOS + Xcode)
npx expo run:ios
```

---

## 🎭 Roles & Features

| Role | Tabs | Key Features |
|------|------|--------------|
| **Student** | Dashboard, Timetable, Homework, Results, Messages | Classes, assignments, exam results, performance charts |
| **Teacher** | Dashboard, Attendance, Homework, Circulars, Messages | Mark attendance, class management, quick actions |
| **Head of Teachers** | Dashboard, Attendance, Fees, Circulars, Calendar | School-wide overview, admissions pipeline, analytics |
| **Parent** | Dashboard, Attendance, Bus, Fees, Messages | Child's progress, live bus tracking, fee payments |

---

## 🎨 Design

- **Color scheme**: Midnight navy (#0f172a) + Ivory (#fafaf9) + Scholaria Gold (#c89c4a)
- **Typography**: System fonts with heavy weights and tight letter-spacing
- **Data**: All Indian context — ₹, Bengaluru localities, Indian names, Hindi subject

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `expo` | Core runtime |
| `@react-navigation/native` | Navigation |
| `@react-navigation/bottom-tabs` | Tab bar |
| `@react-navigation/native-stack` | Stack navigation |
| `react-native-screens` | Native screen performance |
| `react-native-safe-area-context` | Safe area handling |
| `@expo/vector-icons` | Ionicons icon set |
| `react-native-chart-kit` | Bar & line charts |
| `react-native-svg` | SVG support for charts |

---

## 🔧 Connecting a Real Backend

To replace mock data with a real API:

1. Replace constants in `src/data/mockData.js` with API calls
2. Add `axios` or use `fetch` for HTTP requests
3. Add AsyncStorage for caching: `npx expo install @react-native-async-storage/async-storage`
4. For real bus GPS: integrate Google Maps + WebSockets

---

## 📞 Support

Built with ❤️ by Scholaria · Est. MMXXVI
