import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  ImageSourcePropType,
  Keyboard,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/native';
import dayjs from 'dayjs';

import theme from './src/theme';
import { Calendar, Container, Input, Todo } from './src/components';

const BackgroundImage = styled.Image(StyleSheet.absoluteFill);

export interface ITodoData {
  id: number;
  date: dayjs.Dayjs;
  content: string;
  isSuccess: boolean;
}

const App = () => {
  const { getItem, setItem } = useAsyncStorage('todos');

  const [isDatePicker, setIsDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  const [todos, setTodos] = useState<ITodoData[]>([]);
  const [content, setContent] = useState('');

  const flatListRef = useRef<FlatList>(null);

  const source = useMemo<ImageSourcePropType>(() => {
    return {
      uri: 'https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c',
    };
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => dayjs(todo.date).isSame(selectedDate, 'date'));
  }, [todos, selectedDate]);

  const behavior = useMemo(() => (Platform.OS === 'ios' ? 'padding' : 'height'), []);

  const placeholder = useMemo(() => {
    return `${dayjs(selectedDate).format('MM월 D일')}에 해야할 일 추가하기`;
  }, [selectedDate]);

  useEffect(() => {
    (async () => {
      const todos = await getItem();

      setTodos(JSON.parse(todos ?? '[]'));
    })();
  }, [getItem]);

  const onPressLeft = useCallback(() => {
    setSelectedDate(dayjs(selectedDate).subtract(1, 'month'));
  }, [selectedDate]);

  const onPressHeaderDate = useCallback(() => {
    setIsDatePicker(true);
  }, []);

  const onPressRight = useCallback(() => {
    setSelectedDate(dayjs(selectedDate).add(1, 'month'));
  }, [selectedDate]);

  const onPressDate = useCallback(
    (date: dayjs.Dayjs) => () => {
      setSelectedDate(date);
    },
    []
  );

  const ListHeaderComponent = useCallback(() => {
    return (
      <>
        <Calendar
          todos={todos}
          selectedDate={selectedDate}
          onPressLeft={onPressLeft}
          onPressHeaderDate={onPressHeaderDate}
          onPressRight={onPressRight}
          onPressDate={onPressDate}
        />

        <View
          style={{
            width: 4,
            height: 4,
            alignSelf: 'center',
            backgroundColor: theme.colors.gray[300],
            borderRadius: 2,
            marginVertical: 10,
          }}
        />
      </>
    );
  }, [todos, selectedDate, onPressLeft, onPressHeaderDate, onPressRight, onPressDate]);

  const keyExtractor = useCallback(({ id }: ITodoData) => `${id}`, []);

  const renderItem = useCallback<ListRenderItem<ITodoData>>(
    ({ item }) => {
      return (
        <Todo
          {...item}
          onPress={async () => {
            const updatedTodos = todos.map((state) => {
              return state.id === item.id ? { ...state, isSuccess: !state.isSuccess } : state;
            });

            setTodos(updatedTodos);

            await setItem(JSON.stringify(updatedTodos));
          }}
          onLongPress={() => {
            Alert.alert('정말로 삭제하시겠습니까?', '', [
              { text: '취소', style: 'cancel' },
              {
                text: '확인',
                onPress: async () => {
                  const updatedTodos = todos.filter((state) => state.id !== item.id);

                  setTodos(updatedTodos);

                  await setItem(JSON.stringify(updatedTodos));
                },
              },
            ]);
          }}
        />
      );
    },
    [todos, setItem]
  );

  const onFocus = useCallback(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd();
    }, 100);
  }, []);

  const onChangeContent = useCallback((content: string) => {
    setContent(content);
  }, []);

  const onSubmitContent = useCallback(async () => {
    Keyboard.dismiss();

    const index = todos.length - 1;
    const id = index >= 0 ? todos[index].id + 1 : 0;
    const todo = { id, date: selectedDate, content, isSuccess: false };
    const updatedTodos = [...todos, todo];

    setTodos(updatedTodos);
    setContent('');

    await setItem(JSON.stringify(updatedTodos));
  }, [todos, selectedDate, content, setItem]);

  const onConfirm = useCallback((date: Date) => {
    setSelectedDate(dayjs(date));
    setIsDatePicker(false);
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Container>
          <BackgroundImage source={source} />

          <KeyboardAvoidingView behavior={behavior}>
            <FlatList
              ref={flatListRef}
              showsVerticalScrollIndicator={false}
              data={filteredTodos}
              ListHeaderComponent={ListHeaderComponent}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />

            <Input
              placeholder={placeholder}
              value={content}
              onFocus={onFocus}
              onChangeText={onChangeContent}
              onSubmit={onSubmitContent}
            />
          </KeyboardAvoidingView>

          <DateTimePickerModal
            isVisible={isDatePicker}
            mode="date"
            onConfirm={onConfirm}
            onCancel={onConfirm}
          />
        </Container>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default memo(App);
