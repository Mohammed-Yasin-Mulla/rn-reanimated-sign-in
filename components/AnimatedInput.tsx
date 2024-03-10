import React from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  View,
  Text,
} from 'react-native';

import { StarIcon } from 'react-native-heroicons/solid';
import { XMarkIcon } from 'react-native-heroicons/outline';
import Spacer from './Spacer';
import { ErrorWrapper } from './Animations/ErrorWrapper';
import { colors } from '../libs/theme';
import { useFocusTextInput } from './hook/useFocusTextInput';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  isError?: boolean;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  KeyboardTypeOptions?: KeyboardTypeOptions;
  LeftIcon?: () => JSX.Element;
  label?: string;
  required?: boolean; // only puts up a start icon beside the lable
}

export const AnimatedInput: React.FC<Props> = ({
  value,
  isError = false,
  onChangeText,
  placeholder,
  onBlur,
  KeyboardTypeOptions,
  LeftIcon,
  label,
  required,
}) => {
  const { handleViewPress, textInputRef } = useFocusTextInput();

  return (
    <View style={{ width: '100%' }}>
      {label && (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, color: colors.white }}>{label}</Text>
            {required && <StarIcon fill={colors.red} size={10} />}
          </View>
          <Spacer space={4} />
        </>
      )}
      <ErrorWrapper isError={isError}>
        <Pressable
          style={[
            CoreInputStyles.container,
            { borderColor: isError ? colors.red : colors.primary },
          ]}
          onPress={handleViewPress}>
          {LeftIcon && <LeftIcon />}
          <TextInput
            ref={textInputRef}
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            style={[CoreInputStyles.text, CoreInputStyles.textContainer]}
            onBlur={onBlur}
            keyboardType={KeyboardTypeOptions}
          />
          {value && (
            <Pressable onPress={() => onChangeText('')}>
              <XMarkIcon stroke={colors.lightGray} size={18} />
            </Pressable>
          )}
        </Pressable>
      </ErrorWrapper>
    </View>
  );
};

export const CoreInputStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
    columnGap: 10,
    borderWidth: 1,
  },
  text: {
    color: colors.deepPurple,
  },
  textContainer: {
    flex: 1,
  },
});
