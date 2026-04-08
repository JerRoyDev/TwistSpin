import React from 'react';
import { Text, View } from 'react-native';
import { ColorSection } from './SpinnerWheel';

type ResultBoardProps = {
  isSpinning: boolean;
  result: { limb: string; color: ColorSection } | null;
};

const ResultBoard = ({ isSpinning, result }: ResultBoardProps) => {
  return (
    <View className='flex h-16 w-64 items-center justify-center rounded-full px-6 ${res}'
    style={{ backgroundColor: result ? result.color.value : '#e2e8f0' }} 
    >
      {result ? (
        <Text>{`${result.limb} • ${result.color.label}`}</Text>
      ) : (
        <Text>Snurra för att få ett resultat</Text>
      )}
    </View>
  );
};

export { ResultBoard };
