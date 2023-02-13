import { FC, memo, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';

import { ITodoData } from '../../App';

const Container = styled.Pressable(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 5,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.gray[500],
  marginHorizontal: 10,
}));

const Content = styled.Text(({ theme }) => ({
  flex: 1,
  fontSize: 14,
  color: theme.colors.text,
}));

interface ITodo extends ITodoData {
  onPress: () => void;
  onLongPress: () => void;
}

const Todo: FC<ITodo> = ({ content, isSuccess, onPress, onLongPress }) => {
  const theme = useTheme();

  const color = useMemo(() => {
    return isSuccess ? theme.colors.text : theme.colors.gray[400];
  }, [isSuccess, theme.colors]);

  return (
    <Container onPress={onPress} onLongPress={onLongPress}>
      <Content>{content}</Content>

      <Ionicons name="checkmark" size={16} color={color} />
    </Container>
  );
};

export default memo(Todo);
