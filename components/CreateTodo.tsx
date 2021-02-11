import { memo, useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import { createTodoAPI } from '../lib/api';

const colors = ['red', 'pink', 'yellow', 'green', 'blue', 'indigo', 'purple'];

const CreateTodo: React.FC = () => {
  const router = useRouter();

  const [selectedColor, setSelectedColor] = useState('');
  const [text, setText] = useState('');

  const onClick = useCallback(
    (color) => () => {
      setSelectedColor(color);
    },
    []
  );

  const onSubmit = useCallback(async () => {
    if (!selectedColor || !text) {
      return alert('색상과 할 일을 입력해주세요.');
    }

    try {
      await createTodoAPI({ text, color: selectedColor });

      return router.push('/');
    } catch (e) {
      console.error(e);
    }
  }, [selectedColor, text]);

  const onChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
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
            className="svg text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={onSubmit}
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
