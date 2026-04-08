import React, { useEffect } from 'react';
import { Animated, View, Image, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const DEFAULT_LIMBS = [
  'Right Hand',
  'Right Foot',
  'Left Hand',
  'Left Foot',
] as const;

const DEFAULT_COLORS: readonly ColorSection[] = [
  { label: 'Red', value: '#ef4444' },
  { label: 'Yellow', value: '#facc15' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Green', value: '#22c55e' },
] as const;

const VIEWBOX_SIZE = 200;
const RADIUS = 100;

type ColorSection = { label: string; value: string };

type SpinnerWheelProps = {
  rotation: Animated.Value;
  setResult: (result: { limb: string; color: ColorSection }) => void;
  isSpinning: boolean;
  setIsSpinning: (spinning: boolean) => void;
  limbs?: readonly string[];
  colors?: readonly ColorSection[];
};

const SpinnerWheel = ({
  rotation,
  setResult,
  isSpinning,
  setIsSpinning,
  limbs = DEFAULT_LIMBS,
  colors = DEFAULT_COLORS,
}: SpinnerWheelProps) => {
  const parentSections = limbs.length;
  const parentAngle = 360 / parentSections;
  const subSectionAngle = parentAngle / colors.length;
  const limbImages: Record<string, any> = {
    'right hand': require('assets/limbs/right-hand-icon.png'),
    'left hand': require('assets/limbs/left-hand-icon.png'),
    'right foot': require('assets/limbs/right-footprint-icon.png'),
    'left foot': require('assets/limbs/left-footprint-icon.png'),
  };

  const determineResult = (angle: number) => {
    const normalized = angle % 360;
    const effectiveAngle = (360 - normalized) % 360;

    const limbIndex = Math.floor(effectiveAngle / parentAngle) % limbs.length;
    const colorIndex =
      Math.floor((effectiveAngle % parentAngle) / subSectionAngle) %
      colors.length;
    const color = colors[colorIndex];
    setResult({ limb: limbs[limbIndex], color: { label: color.label, value: color.value } });
  };

  useEffect(() => {
    if (isSpinning) {
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
    }

  }, [isSpinning]);

  const sections = limbs.map((limb, parentIndex) => {
    const parentStart = parentIndex * parentAngle;
    const midAngle = parentStart + parentAngle / 2;
    const iconPosition = polarToCartesian(100, 100, 60, midAngle);

    const subsections = colors.map((color, subIndex) => {
      const subStart = parentStart + subIndex * subSectionAngle;
      const subEnd = subStart + subSectionAngle;
      const path = describeArc(100, 100, RADIUS, subStart, subEnd);

      return (
        <Path
          key={`${parentIndex}-${subIndex}`}
          d={path}
          fill={color.value}
          stroke='#0f172a'
          strokeWidth={0.7}
        />
      );
    });

    const boundaryPath = describeArc(
      100,
      100,
      RADIUS,
      parentStart,
      parentStart + parentAngle
    );

    const limbImage = limbImages[limb.toLowerCase()];

    return {
      key: limb,
      subsections,
      boundaryPath,
      limbImage,
      iconPosition,
      angle: midAngle,
    };
  });

  const rotationStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <View className='items-center justify-center'>
      {/* Pointer */}
      <View className='absolute -top-5 z-10 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[28px] border-l-transparent border-r-transparent border-t-amber-100' />
      {/* Spinner Wheel */}
      <Animated.View
        style={rotationStyle}
        className='rounded-full border-4 border-white/20 bg-slate-900/60'
      >
        <Svg width={VIEWBOX_SIZE} height={VIEWBOX_SIZE} viewBox='0 0 200 200'>
          {sections.map((section) => (
            <React.Fragment key={section.key}>
              {section.subsections}
              <Path
                d={section.boundaryPath}
                fill='none'
                stroke='#0f172a'
                strokeWidth={2}
              />
            </React.Fragment>
          ))}
        </Svg>

        {sections.map((section) => {
          if (!section.limbImage) return null;

          return (
            <Animated.View
              key={section.key}
              style={{
                position: 'absolute',
                left: section.iconPosition.x - 25, // Adjusted for larger icons
                top: section.iconPosition.y - 25, // Adjusted for larger icons
                width: 50, // Increased icon size
                height: 50, // Increased icon size
                transform: [
                  {
                    rotate: `${section.angle}deg`, // Rotate icon to face outward
                  },
                ],
              }}
            >
              <Image
                source={section.limbImage}
                style={{ width: '100%', height: '100%' }}
                resizeMode='contain'
              />
            </Animated.View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    `M ${x} ${y}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
};

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

export type { ColorSection };
export { SpinnerWheel, DEFAULT_LIMBS, DEFAULT_COLORS };
