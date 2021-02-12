import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import todo from './todo';

const rootReducer = combineReducers({
  todo: todo.reducer,
});

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };

    if (state.count) nextState.count = state.count;

    return nextState;
  }

  return rootReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

const initStore = () => {
  return configureStore({
    reducer,
    devTools: true,
  });
};

export const wrapper = createWrapper(initStore);
