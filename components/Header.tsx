import { memo } from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center h-12 px-3 border-bottom">
      <h1 className="text-xl font-semibold">TodoList</h1>
    </div>
  );
};

export default memo(Header);
