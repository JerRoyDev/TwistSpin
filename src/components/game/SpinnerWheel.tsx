import React from 'react';
import { Animated, View } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';

const DEFAULT_LIMBS = [
  'Right Hand',
  'Left Hand',
  'Right Foot',
  'Left Foot',
] as const;
type ColorSection = { label: string; value: string };

const DEFAULT_COLORS: readonly ColorSection[] = [
  { label: 'Red', value: '#ef4444' },
  { label: 'Yellow', value: '#facc15' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Green', value: '#22c55e' },
] as const;

const VIEWBOX_SIZE = 200;
const RADIUS = 100;

type SpinnerWheelProps = {
  rotation: Animated.Value;
  limbs?: readonly string[];
  colors?: readonly ColorSection[];
};

const SpinnerWheel = ({
  rotation,
  limbs = DEFAULT_LIMBS,
  colors = DEFAULT_COLORS,
}: SpinnerWheelProps) => {
  const parentSections = limbs.length;
  const parentAngle = 360 / parentSections;
  const subSectionAngle = parentAngle / colors.length;

  const renderSections = () => {
    return limbs.map((limb, parentIndex) => {
      const parentStart = parentIndex * parentAngle;
      const textAngle = parentStart + parentAngle / 2;
      const textPosition = polarToCartesian(100, 100, 60, textAngle);

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
            strokeWidth={1}
          />
        );
      });

      return (
        <React.Fragment key={limb}>
          {subsections}
          <SvgText
            x={textPosition.x}
            y={textPosition.y}
            fill='#f8fafc'
            stroke='#0f172a'
            strokeWidth={0.5}
            fontSize={16}
            fontWeight='bold'
            textAnchor='middle'
          >
            {limb}
          </SvgText>
        </React.Fragment>
      );
    });
  };

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
          {renderSections()}
        </Svg>
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
