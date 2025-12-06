import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/ui/button';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className='flex-1 items-center justify-center bg-slate-50 p-4'>
      <Text className='text-6xl font-bold text-slate-900 mb-12'>TwistSpin</Text>
      <Button
        label='Start Game'
        onPress={() => router.push('/game')}
        size='lg'
        className='w-48'
      />
    </View>
  );
}
