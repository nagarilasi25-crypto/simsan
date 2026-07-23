import React from 'react';

export const TableSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-3 animate-pulse p-4">
      <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-lg w-full mb-4"></div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center space-x-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-full shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2"></div>
          </div>
          <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
          <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
