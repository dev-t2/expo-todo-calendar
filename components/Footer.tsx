import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';

const Footer: React.FC = () => {
  const router = useRouter();

  const isIndex = router.pathname === '/';

  const onClick = useCallback(() => {
    router.push(`${isIndex ? '/todo' : '/'}`);
  }, [isIndex]);

  return (
    <div className="w-full h-12 border-top flex justify-center items-center">
      {isIndex ? (
        <svg
          className="svg text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={onClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ) : (
        <svg
          className="svg text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={onClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      )}
    </div>
  );
};

export default memo(Footer);
