import React from 'react';
import { Pressable, Text } from 'react-native';
import { cn } from '@/utils/utils';

type SpinButtonProps = {
  onPress: () => void;
  isSpinning: boolean;
};

const SpinButton = ({ onPress, isSpinning }: SpinButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={isSpinning}
      className={cn(
        'w-48 rounded-full bg-emerald-500 py-4 shadow-lg shadow-emerald-500/40',
        'active:scale-95',
        isSpinning && 'opacity-70'
      )}
    >
      <Text className='text-center text-2xl font-bold text-white'>
        {isSpinning ? 'Snurrar...' : 'Snurra'}
      </Text>
    </Pressable>
  );
};

export { SpinButton };
