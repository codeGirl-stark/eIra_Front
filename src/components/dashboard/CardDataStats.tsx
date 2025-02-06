import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-6 shadow-md dark:border-transparent dark:bg-blue-950">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-gray-500">
        {children}
      </div>

      <div className="mt-5 px-3 flex items-end justify-between">
        <div>
          <h4 className="text-2xl mb-5 font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium text-gray-400">{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium text-green-700 `}
        >
          {rate}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;