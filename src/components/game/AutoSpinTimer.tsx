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

  const sliderColors = useMemo(
    () => ({
      minimum: '#22c55e',
      maximum: '#475569',
      thumb: '#0ea5e9',
    }),
    []
  );

  useEffect(() => {
    if (!enabled) {
      setRemaining(delay);
      return;
    }

    if (isSpinning) {
      return;
    }

    if (remaining <= 0) {
      onAutoSpin();
      setRemaining(delay);
      return;
    }

    const interval = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled, delay, remaining, onAutoSpin, isSpinning]);

  const toggleEnabled = (value: boolean) => {
    setEnabled(value);
    setRemaining(delay);
  };

  const handleSliderChange = (value: number) => {
    const rounded = Math.round(value);
    setDelay(rounded);
    setRemaining(rounded);
  };

  return (
    <View className='w-full rounded-2xl bg-white/5 p-4'>
      <View className='mb-3 flex-row items-center justify-between'>
        <Text className='text-base font-semibold text-white'>Auto-spin</Text>
        <Switch
          value={enabled}
          onValueChange={toggleEnabled}
          thumbColor={enabled ? sliderColors.thumb : '#cbd5f5'}
          trackColor={{ false: '#475569', true: '#22c55e' }}
        />
      </View>
      <Text className='text-sm text-slate-200'>
        Snurrar automatiskt om{' '}
        <Text className='font-semibold'>{remaining}s</Text>
      </Text>
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
        disabled={!enabled}
      />
      <Text className='text-right text-xs uppercase tracking-widest text-slate-400'>
        {delay} sekunder
      </Text>
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
