import { memo, useMemo } from 'react';

import { ColorType, TodosType } from '../types/todo';

const TodoList: React.FC<TodosType> = ({ todos }) => {
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
      <div className="border-bottom">
        <div className="border-bottom p-3">
          <div className="text-base mb-2 font-semibold">
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

        <div>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="flex justify-between items-center h-12 border-bottom">
                <div className="h-full flex items-center">
                  <div className={`w-3 h-full bg-${todo.color}-600`} />
                  <div className={`ml-3 text-base ${todo.checked && 'line-through'}`}>
                    {todo.text}
                  </div>
                </div>

                <div className="flex mr-3">
                  {todo.checked ? (
                    <>
                      <svg
                        className="w-6 mr-3 text-red-900"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>

                      <svg
                        className="w-6 text-green-900"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </>
                  ) : (
                    <button
                      className="w-5 h-5 rounded-full border border-solid border-gray-200 bg-transparent focus:outline-none"
                      onClick={() => {}}
                    ></button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(TodoList);
