import './global.css';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card';

export default function App() {
  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar style="auto" />
      <ScrollView className="flex-1">
        <View className="p-6 pt-12">
          <Text className="text-4xl font-bold text-slate-900 mb-2">
            TwistSpin
          </Text>
          <Text className="text-lg text-slate-600 mb-8">
            Expo app with NativeWind & React Native Reusables
          </Text>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Welcome!</CardTitle>
              <CardDescription>
                This is a demo of NativeWind with React Native Reusables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-slate-700">
                NativeWind provides Tailwind CSS styling for React Native, giving you a familiar
                and powerful way to style your components.
              </Text>
            </CardContent>
            <CardFooter>
              <Button label="Get Started" variant="default" className="mr-2" />
              <Button label="Learn More" variant="outline" />
            </CardFooter>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Different button styles using variants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button label="Default" variant="default" className="mb-2" />
              <Button label="Destructive" variant="destructive" className="mb-2" />
              <Button label="Outline" variant="outline" className="mb-2" />
              <Button label="Secondary" variant="secondary" className="mb-2" />
              <Button label="Ghost" variant="ghost" className="mb-2" />
              <Button label="Link" variant="link" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button Sizes</CardTitle>
              <CardDescription>Different button sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button label="Small" size="sm" className="mb-2" />
              <Button label="Default" size="default" className="mb-2" />
              <Button label="Large" size="lg" />
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
