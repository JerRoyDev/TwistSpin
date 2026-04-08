import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

const MIN_DELAY = 3;
const MAX_DELAY = 15;

interface AutoSpinTimerProps {
  onAutoSpin: () => void;
  isSpinning: boolean;
}

const AutoSpinTimer = ({ onAutoSpin, isSpinning }: AutoSpinTimerProps) => {
  const [enabled, setEnabled] = useState(false);
  const [delay, setDelay] = useState(8);
  const [remaining, setRemaining] = useState(delay);
  
  // State för att vänta på första manuella snurret
  const [waitingForFirstSpin, setWaitingForFirstSpin] = useState(false);

  const sliderColors = useMemo(
    () => ({
      minimum: '#22c55e',
      maximum: '#475569',
      thumb: '#0ea5e9',
    }),
    []
  );

  // Återställ timer när snurr är klart (så vi alltid börjar om från full tid)
  useEffect(() => {
    if (!isSpinning && enabled) {
        setRemaining(delay);
    }
  }, [isSpinning, enabled, delay]);

  // Hantera "väntar på första snurr": När hjulet börjar snurra, sluta vänta.
  useEffect(() => {
    if (isSpinning && enabled) {
        setWaitingForFirstSpin(false);
    }
  }, [isSpinning, enabled]);

  // Timer logik
  useEffect(() => {
    // Kör inte om: Avstängd, Snurrar just nu, eller Väntar på första start
    if (!enabled || isSpinning || waitingForFirstSpin) {
      return;
    }

    if (remaining <= 0) {
      onAutoSpin();
      // Återställning sker via isSpinning-effekten ovan, men vi sätter den 
      // här också för att undvika negativa tal innan state uppdateras
      setRemaining(delay); 
      return;
    }

    const interval = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled, isSpinning, waitingForFirstSpin, remaining, onAutoSpin, delay]);

  const toggleEnabled = (value: boolean) => {
    setEnabled(value);
    if (value) {
        // Om vi slår PÅ: Sätt vänteläge och återställ tid
        setWaitingForFirstSpin(true);
        setRemaining(delay);
    }
  };

  const handleSliderChange = (value: number) => {
    const rounded = Math.round(value);
    setDelay(rounded);
    // Uppdatera visuell tid direkt, om vi inte är mitt i ett snurr
    if (!isSpinning) {
        setRemaining(rounded);
    }
  };

  return (
    // Dynamisk container: Diskret (ingen bg) när avstängd, Tydlig (med bg) när påslagen
    <View className={`w-full transition-all ${enabled ? 'bg-white/5 rounded-2xl p-4' : 'py-2 items-center'}`}>
      
      {/* Top Row: Alltid synlig rubrik och switch */}
      <View className='flex-row items-center justify-between w-full'>
        <Text className='text-base font-semibold text-white'>Auto-spin</Text>
        <Switch
          value={enabled}
          onValueChange={toggleEnabled}
          trackColor={{ false: '#475569', true: '#22c55e' }}
          thumbColor={enabled ? sliderColors.thumb : '#cbd5f5'}
        />
      </View>

      {/* Expanded: Slider och status (Visas bara när enabled = true) */}
      {enabled && (
        <View className="mt-4 w-full">
            <View className="flex-row justify-between mb-2">
                 <Text className="text-slate-300 text-sm">
                    {waitingForFirstSpin 
                        ? "Snurra manuellt för att starta..." 
                        : isSpinning 
                            ? "Snurrar..." 
                            : `Nästa snurr om ${remaining}s`
                    }
                 </Text>
                 <Text className="text-slate-400 text-xs font-bold uppercase">{delay} sekunder</Text>
            </View>
            
          <Slider
            style={styles.slider}
            minimumValue={MIN_DELAY}
            maximumValue={MAX_DELAY}
            value={delay}
            step={1}
            minimumTrackTintColor={sliderColors.minimum}
            maximumTrackTintColor={sliderColors.maximum}
            thumbTintColor={sliderColors.thumb}
            onValueChange={handleSliderChange}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: '100%',
    marginTop: 8,
  },
});

export { AutoSpinTimer };
