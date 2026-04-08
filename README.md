# TwistSpin

React Native Expo app - Automatic Twister spinner

## Features

- ✨ **Expo** - React Native framework for building universal apps
- 🎨 **NativeWind** - Tailwind CSS for React Native
- 🧩 **React Native Reusables** - Beautiful, reusable UI components
- 📱 **TypeScript** - Type-safe development
- 🎯 **Cross-platform** - iOS, Android, and Web support

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Expo CLI (installed automatically)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Jryolsn/TwistSpin.git
cd TwistSpin
```

2. Install dependencies:
```bash
npm install
```

### Running the App

Start the development server:
```bash
npm start
```

This will open the Expo Dev Tools in your browser. From there you can:

- Press `a` to run on Android emulator
- Press `i` to run on iOS simulator (macOS only)
- Press `w` to run on web browser
- Scan the QR code with the Expo Go app on your physical device

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web

## Project Structure

```
TwistSpin/
├── components/
│   └── ui/
│       ├── button.tsx    # Reusable Button component with variants
│       └── card.tsx      # Card components (Card, CardHeader, CardContent, etc.)
├── lib/
│   └── utils.ts          # Utility functions (cn helper)
├── assets/               # Images and other static assets
├── App.tsx               # Main app component
├── global.css            # Tailwind CSS directives
├── tailwind.config.js    # Tailwind configuration
├── babel.config.js       # Babel configuration with NativeWind
├── metro.config.js       # Metro bundler configuration
└── tsconfig.json         # TypeScript configuration
```

## Technologies Used

### Core
- **React Native** - Framework for building native apps
- **Expo SDK** - Tooling and libraries for React Native
- **TypeScript** - JavaScript with syntax for types

### Styling
- **NativeWind** - Tailwind CSS for React Native
- **Tailwind CSS** - Utility-first CSS framework
- **class-variance-authority** - For component variants

### UI Components
- **React Native Reusables** - Component library based on shadcn/ui
- **@rn-primitives/slot** - Component composition primitives
- **lucide-react-native** - Icon library

## Using Components

### Button Component

```tsx
import { Button } from './components/ui/button';

<Button label="Click me" variant="default" />
<Button label="Danger" variant="destructive" />
<Button label="Outline" variant="outline" />
```

### Card Component

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <Text>Card content</Text>
  </CardContent>
</Card>
```

### Using NativeWind Classes

```tsx
<View className="flex-1 bg-slate-50 p-4">
  <Text className="text-2xl font-bold text-slate-900">
    Hello NativeWind!
  </Text>
</View>
```

## Development Tips

1. **Hot Reload** - The app supports hot reloading, so changes appear instantly
2. **TypeScript** - All components are typed for better development experience
3. **Tailwind Intellisense** - Install the Tailwind CSS IntelliSense extension in your editor
4. **Component Variants** - Use the variant system for consistent styling

## License

This project is open source and available under the MIT License.

