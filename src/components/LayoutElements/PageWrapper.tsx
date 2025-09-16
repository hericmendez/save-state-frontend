import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className=" transition-colors duration-1000 flex flex-col  px-4  space-y-2 bg-zinc-100 grow pb-4 pt-12  dark:bg-slate-700 text-gray-900 dark:text-white">
      {children}
    </div>
  );
}
