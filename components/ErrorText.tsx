import { Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { colors } from '../libs/theme';

interface Props {
  children: React.ReactNode;
  textColor?: string;
}

export const ErrorText: FC<Props> = ({ children, textColor }) => {
  const color = textColor || colors.red;

  return <Text style={[styles.errorText, { color }]}>{children}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.red,
    fontSize: 12,
  },
});
