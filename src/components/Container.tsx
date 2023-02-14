import { FC, memo, ReactNode, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from '@emotion/native';
import { Keyboard } from 'react-native';

interface IStyledPressable {
  paddingTop: number;
  paddingBottom: number;
}

const StyledPressable = styled.Pressable<IStyledPressable>(({ paddingTop, paddingBottom }) => ({
  flex: 1,
  alignItems: 'center',
  paddingTop,
  paddingBottom,
  backgroundColor: '#fff',
}));

interface IContainer {
  children: ReactNode;
}

const Container: FC<IContainer> = ({ children }) => {
  const { top, bottom } = useSafeAreaInsets();

  const onPress = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <StyledPressable paddingTop={top} paddingBottom={bottom} onPress={onPress}>
      {children}
    </StyledPressable>
  );
};

export default memo(Container);
