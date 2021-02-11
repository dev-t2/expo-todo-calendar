import { memo } from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center h-12 px-4 border-bottom">
      <h1 className="text-lg font-semibold text-gray-800">TodoList</h1>
    </div>
  );
};

export default memo(Header);
