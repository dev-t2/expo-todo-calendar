import { memo, useCallback, useState } from 'react';

const colors = ['red', 'pink', 'yellow', 'green', 'blue', 'indigo', 'purple'];

const CreateTodo: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('');
  const [text, setText] = useState('');

  const onClick = useCallback(
    (color) => () => {
      setSelectedColor(color);
    },
    []
  );

  const onChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Add Todo</h2>
        <button className="py-1 px-2 border border-solid border-gray-900 rounded-md focus:outline-none text-sm">
          추가하기
        </button>
      </div>

      <div className="mt-4 flex justify-between">
        <div className="flex">
          {colors.map((color, index) => (
            <button
              key={index}
              className={`bg-${color}-600 w-6 h-6 mr-4 rounded-full focus:outline-none ${
                selectedColor === color ? `ring-2 ring-${color}-400` : ''
              }`}
              onClick={onClick(color)}
            />
          ))}
        </div>

        <div>
          <svg
            className="svg"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => {}}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>
      </div>

      <div>
        <textarea
          className="w-full h-72 mt-4 rounded-md border border-gray-200 p-3 resize-none focus:outline-none text-sm"
          value={text}
          placeholder="할 일을 입력해주세요."
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default memo(CreateTodo);
