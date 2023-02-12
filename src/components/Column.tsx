import { FC, memo, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import dayjs from 'dayjs';

interface IContainer {
  size: number;
  isSelected: boolean;
}

const Container = styled.Pressable<IContainer>(({ theme, size, isSelected }) => ({
  width: size,
  height: size,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: isSelected ? `${theme.colors.gray[100]}99` : undefined,
  borderRadius: size / 2,
}));

interface IStyledText {
  color: string;
  isCurrentMonth: boolean;
}

const StyledText = styled.Text<IStyledText>(({ color, isCurrentMonth }) => ({
  fontWeight: '500',
  color,
  opacity: isCurrentMonth ? 1 : 0.5,
}));

interface IColumn {
  paddingHorizontal?: number;
  selectedDate: dayjs.Dayjs;
  item: dayjs.Dayjs;
  onPress: () => void;
}

const Column: FC<IColumn> = ({ paddingHorizontal = 0, selectedDate, item, onPress }) => {
  const { width } = useWindowDimensions();

  const theme = useTheme();

  const size = useMemo(() => {
    return Math.floor((width - paddingHorizontal * 2) / 7);
  }, [width, paddingHorizontal]);

  const isSelected = useMemo(() => dayjs(selectedDate).isSame(item, 'date'), [selectedDate, item]);

  const color = useMemo(() => {
    const day = dayjs(item).get('day');

    if (day === 0) {
      return theme.colors.red[500];
    }

    if (day === 6) {
      return theme.colors.blue[500];
    }

    return theme.colors.text;
  }, [item, theme.colors]);

  const isCurrentMonth = useMemo(() => {
    return dayjs(item).isSame(selectedDate, 'month');
  }, [item, selectedDate]);

  const date = useMemo(() => dayjs(item).get('date'), [item]);

  return (
    <Container size={size} isSelected={isSelected} onPress={onPress}>
      <StyledText color={color} isCurrentMonth={isCurrentMonth}>
        {date}
      </StyledText>
    </Container>
  );
};

export default memo(Column);
