import { memo } from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center h-12 px-3 border-bottom">
      <h1 className="font-sans text-xl">TodoList</h1>
    </div>
  );
};

export default memo(Header);
