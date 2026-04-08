import React from 'react';
import { View, Image } from 'react-native';
import { ColorSection } from './SpinnerWheel';

// Vi definierar vilka limbs som finns och vilken bild de ska ha
const LIMB_IMAGES = {
  'Left Hand': require('../../../assets/limbs/left-hand-icon.png'),
  'Left Foot': require('../../../assets/limbs/left-footprint-icon.png'),
  'Right Foot': require('../../../assets/limbs/right-footprint-icon.png'),
  'Right Hand': require('../../../assets/limbs/right-hand-icon.png'),
};

type LimbKey = keyof typeof LIMB_IMAGES;

type LimbPositionProps = {
  // En karta där nyckeln är kroppsdelen (t.ex. 'Left Hand') och värdet är färgen (eller null om den inte är satt än)
  positions: Record<string, ColorSection | null>;
};

const LimbPosition = ({ positions }: LimbPositionProps) => {
  // Vi loopar igenom våra fasta nycklar (Left Hand, Right Hand...)
  const limbs = Object.keys(LIMB_IMAGES) as LimbKey[];

  return (
    <View className="flex-row gap-4 mb-8"> 
      {limbs.map((limb) => {
        const activeColor = positions[limb];
        
        return (
          <View 
            key={limb} 
            className="w-16 h-16 rounded-xl items-center justify-center border-2 border-slate-700"
            // Om vi har en färg, använd den som bakgrund. Annars transparent/mörk.
            style={{ 
              backgroundColor: activeColor ? activeColor.value : 'transparent',
              borderColor: activeColor ? activeColor.value : '#334155' // slate-700
            }}
          >
            {/* Visa bilden */}
            <Image 
              source={LIMB_IMAGES[limb]} 
              className="w-10 h-10"
              resizeMode="contain"
              // Vi kan göra ikonen lite genomskinlig eller vit beroende på behov
              style={{ tintColor: activeColor ? 'white' : '#94a3b8' }} 
            />
          </View>
        );
      })}
    </View>
  );
};

export default LimbPosition;