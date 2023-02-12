import { FC, memo, ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from '@emotion/native';

interface IStyledView {
  paddingTop: number;
  paddingBottom: number;
}

const StyledView = styled.View<IStyledView>(({ paddingTop, paddingBottom }) => ({
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

  return (
    <StyledView paddingTop={top} paddingBottom={bottom}>
      {children}
    </StyledView>
  );
};

export default memo(Container);
