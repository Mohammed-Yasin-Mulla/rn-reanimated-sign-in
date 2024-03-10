import { useRef } from 'react';
import { TextInput } from 'react-native';

export const useFocusTextInput = () => {
  // Create a ref for the TextInput component

  const textInputRef = useRef<TextInput>(null);
  // Function to focus the TextInput when the View is pressed
  const handleViewPress = () => {
    // Check if the ref is available and call the focus method
    if (textInputRef.current) {
      textInputRef.current.blur();

      setTimeout(() => {
        textInputRef?.current?.focus();
      }, 100);
    }
  };

  return { handleViewPress, textInputRef };
};
