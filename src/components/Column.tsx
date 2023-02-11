import { FC, memo, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import dayjs from 'dayjs';

interface IContainer {
  size: number;
}

const Container = styled.Pressable<IContainer>(({ size }) => ({
  width: size,
  height: size,
  justifyContent: 'center',
  alignItems: 'center',
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
  item: dayjs.Dayjs;
}

const Column: FC<IColumn> = ({ paddingHorizontal = 0, item }) => {
  const { width } = useWindowDimensions();

  const theme = useTheme();

  const size = useMemo(() => {
    return Math.floor((width - paddingHorizontal * 2) / 7);
  }, [width, paddingHorizontal]);

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
    const now = dayjs();

    return dayjs(item).isSame(now, 'month');
  }, [item]);

  const date = useMemo(() => dayjs(item).get('date'), [item]);

  return (
    <Container size={size}>
      <StyledText color={color} isCurrentMonth={isCurrentMonth}>
        {date}
      </StyledText>
    </Container>
  );
};

export default memo(Column);
