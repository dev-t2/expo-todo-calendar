import { FC, memo, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import dayjs from 'dayjs';

const Container = styled.View({
  marginTop: 10,
});

const DateContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledPressable = styled.Pressable({
  padding: 10,
});

const Date = styled.Text(({ theme }) => ({
  fontSize: 20,
  color: theme.colors.text,
}));

const ColumnContainer = styled.View({
  flexDirection: 'row',
});

interface IStyledView {
  size: number;
}

const StyledView = styled.View<IStyledView>(({ size }) => ({
  width: size,
  height: size,
  justifyContent: 'center',
  alignItems: 'center',
}));

interface IStyledText {
  color: string;
}

const StyledText = styled.Text<IStyledText>(({ color }) => ({
  fontWeight: '500',
  color,
}));

interface IListHeader {
  paddingHorizontal?: number;
  currentDate: dayjs.Dayjs;
  onPressLeft: () => void;
  onPressHeaderDate: () => void;
  onPressRight: () => void;
}

const ListHeader: FC<IListHeader> = ({
  paddingHorizontal = 0,
  currentDate,
  onPressLeft,
  onPressHeaderDate,
  onPressRight,
}) => {
  const { width } = useWindowDimensions();

  const theme = useTheme();

  const date = useMemo(() => currentDate.format(' YYYY년 MM월 DD일 '), [currentDate]);

  const column = useMemo(() => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const size = Math.floor((width - paddingHorizontal * 2) / 7);

    return days.map((day, index) => {
      const color =
        index === 0
          ? theme.colors.red[500]
          : index === 6
          ? theme.colors.blue[500]
          : theme.colors.text;

      return (
        <StyledView key={index} size={size}>
          <StyledText color={color}>{day}</StyledText>
        </StyledView>
      );
    });
  }, [width, paddingHorizontal, theme.colors]);

  return (
    <Container>
      <DateContainer>
        <StyledPressable onPress={onPressLeft}>
          <SimpleLineIcons name="arrow-left" size={16} color={theme.colors.text} />
        </StyledPressable>

        <StyledPressable onPress={onPressHeaderDate}>
          <Date>{date}</Date>
        </StyledPressable>

        <StyledPressable onPress={onPressRight}>
          <SimpleLineIcons name="arrow-right" size={16} color={theme.colors.text} />
        </StyledPressable>
      </DateContainer>

      <ColumnContainer>{column}</ColumnContainer>
    </Container>
  );
};

export default memo(ListHeader);
