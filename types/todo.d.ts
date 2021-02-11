export type TodoType = {
  id: number;
  text: string;
  color: 'red' | 'pink' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple';
  checked: boolean;
};

export type TodosType = {
  todos: TodoType[];
};

export type ColorType = {
  [key: string]: number;
};
