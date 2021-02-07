import { memo, useMemo } from 'react';
import { ColorType, TodoType } from '../types/todo';

interface IProps {
  todos: TodoType[];
}

const TodoList: React.FC<IProps> = ({ todos }) => {
  const todosColor = useMemo(
    () =>
      todos.reduce((colors: ColorType, todo) => {
        return {
          ...colors,
          [todo.color]: ++colors[todo.color] || 1,
        };
      }, {}),
    [todos]
  );

  return (
    <div>
      <div className="p-3.5 border-bottom">
        <div className="text-base mb-2">
          TODO<span className="ml-2">{todos.length}개</span>
        </div>

        <div className="flex">
          {Object.entries(todosColor).map(([color, value], index) => (
            <div key={index} className="flex items-center mr-2">
              <div className={`w-5 h-5 rounded-full bg-${color}-600`} />
              <div className="text-base ml-1">{value}개</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(TodoList);
