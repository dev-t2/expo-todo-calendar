import { FC, memo } from 'react';
import { TextInputProps } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';

const Container = styled.Pressable({
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 20,
  paddingHorizontal: 30,
});

const IconContainer = styled.Pressable({
  marginLeft: 10,
});

const StyledTextInput = styled.TextInput(({ theme }) => ({
  flex: 1,
  color: theme.colors.text,
}));

interface IInput extends TextInputProps {
  value: string;
  onFocus: () => void;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

const Input: FC<IInput> = ({ value, onFocus, onChangeText, onSubmit, ...props }) => {
  const theme = useTheme();

  return (
    <Container>
      <StyledTextInput
        {...props}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="none"
        value={value}
        onFocus={onFocus}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />

      <IconContainer hitSlop={10} onPress={onSubmit}>
        <AntDesign name="plus" size={16} color={theme.colors.text} />
      </IconContainer>
    </Container>
  );
};

export default memo(Input);
