import React from 'react';
import { View } from 'react-native';

interface Props {
  space: number;
  horizontal?: boolean;
}
const Spacer = ({ space, horizontal }: Props) => {
  return <View style={{ height: horizontal ? 0 : space, width: horizontal ? space : 0 }} />;
};

export default Spacer;
