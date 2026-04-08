import { useState, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';
import { AutoSpinTimer, SpinnerWheel, SpinButton, ColorSection } from '@/components/game';
import { ResultBoard } from '@/components/game/ResultBoard';
import LimbPosition from '@/components/game/LimbPosition';

export default function GameScreen() {
  const router = useRouter();
  const rotation = useRef(new Animated.Value(0)).current;
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<{ limb: string; color: ColorSection } | null>(
    null
  );
  const [limbPositions, setLimbPositions] = useState<Record<string, ColorSection | null>>({
    'Left Hand': null,
    'Right Hand': null,
    'Left Foot': null,
    'Right Foot': null,
  });

  const handleSpinResult = (newResult: { limb: string; color: ColorSection }) => {
    // Uppdatera senaste snurret
    setResult(newResult);
    
    // Uppdatera kartan (behåll gamla, skriv över den nya limbens plats)
    setLimbPositions(prev => ({
      ...prev,
      [newResult.limb]: newResult.color
    }));
  };

  return (
    <SafeAreaView className='flex-1 bg-slate-900'>
      {/* Container med padding för att undvika kanterna och fördela innehåll */}
      <View className='flex-1 items-center justify-between py-6 px-4'>
        
        {/* Rubrik */}
        <View>
          <Text className='text-sm uppercase tracking-[0.3em] text-slate-400'>
            TwistSpin
          </Text>
        </View>

        {/* Spelplanen - Centrerad i mitten */}
        <View className='items-center justify-center gap-4'>
          <LimbPosition positions={limbPositions} />
          <ResultBoard isSpinning={isSpinning} result={result} />
        </View>
          
        <SpinnerWheel
          rotation={rotation}
          setResult={handleSpinResult}
          isSpinning={isSpinning}
          setIsSpinning={setIsSpinning}
        />

        {/* Kontroller */}       
        <View className='items-center gap-4'>
          <SpinButton
            onPress={() => setIsSpinning(true)}
            isSpinning={isSpinning}
          />
          <AutoSpinTimer
            onAutoSpin={() => setIsSpinning(true)}
            isSpinning={isSpinning}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
