import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/ui/button';

export default function GameScreen() {
  const router = useRouter();

  return (
    <View className='flex-1 items-center justify-center bg-slate-900'>
      <Text className='text-3xl font-bold text-white mb-8'>Game Screen</Text>
      <Text className='text-slate-400 mb-8'>Game logic goes here...</Text>
      <Button
        label='Back to Menu'
        variant='outline'
        onPress={() => router.back()}
      />
    </View>
  );
}
