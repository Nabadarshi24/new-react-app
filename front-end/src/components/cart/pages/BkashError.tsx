// import React from 'react'
import { useSearchParams } from 'react-router';

const BkashError = () => {
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div
      className="tw:flex tw:items-center tw:justify-center tw:h-screen tw:text-red-500 tw:text-2xl"
    >
      Payment {message}
    </div>
  );
};

export default BkashError;
