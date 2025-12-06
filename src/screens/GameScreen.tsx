import { useCallback, useRef, useState } from 'react';
import { Animated, Easing, SafeAreaView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';
import {
  AutoSpinTimer,
  DEFAULT_COLORS,
  DEFAULT_LIMBS,
  SpinnerWheel,
  SpinButton,
} from '@/components/game';

export default function GameScreen() {
  const router = useRouter();
  const rotation = useRef(new Animated.Value(0)).current;
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const parentAngle = 360 / DEFAULT_LIMBS.length;
  const subAngle = parentAngle / DEFAULT_COLORS.length;

  const determineResult = useCallback(
    (angle: number) => {
      const normalized = angle % 360;
      const limbIndex =
        Math.floor(normalized / parentAngle) % DEFAULT_LIMBS.length;
      const colorIndex =
        Math.floor((normalized % parentAngle) / subAngle) %
        DEFAULT_COLORS.length;
      const color = DEFAULT_COLORS[colorIndex];
      setResult(`${DEFAULT_LIMBS[limbIndex]} • ${color.label}`);
      rotation.setValue(normalized);
    },
    [parentAngle, subAngle, rotation]
  );

  const spin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    rotation.setValue(0);
    const randomOffset = Math.floor(Math.random() * 360);
    const totalRotation = 720 + randomOffset; // at least two full spins

    Animated.timing(rotation, {
      toValue: totalRotation,
      duration: 2200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      determineResult(totalRotation);
      setIsSpinning(false);
    });
  }, [determineResult, isSpinning, rotation]);

  return (
    <SafeAreaView className='flex-1 bg-slate-900'>
      <View className='flex-1 px-6 py-6'>
        <View className='items-center'>
          <Text className='text-sm uppercase tracking-[0.3em] text-slate-400'>
            TwistSpin
          </Text>
          <Text className='mt-2 text-4xl font-bold text-white'>
            Snurra hjulet
          </Text>
          <Text className='mt-1 text-center text-slate-400'>
            Få nästa rörelse för spelet Twister
          </Text>
        </View>

        <View className='mt-8 items-center'>
          <SpinnerWheel rotation={rotation} />
          {result && (
            <View className='mt-6 rounded-full bg-white/10 px-6 py-3'>
              <Text className='text-lg font-semibold text-white'>{result}</Text>
            </View>
          )}
        </View>

        <View className='mt-10 items-center gap-6'>
          <SpinButton onPress={spin} isSpinning={isSpinning} />
          <AutoSpinTimer onAutoSpin={spin} isSpinning={isSpinning} />
        </View>

        <View className='mt-auto items-center'>
          <Button
            label='Tillbaka till meny'
            variant='outline'
            className='mt-6 w-full'
            onPress={() => router.back()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
