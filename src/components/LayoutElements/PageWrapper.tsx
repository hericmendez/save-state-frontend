import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className=" transition-colors duration-1000 flex flex-col  pr-4 pl-20 space-y-2 bg-zinc-100 grow pb-4 pt-12  dark:bg-[#333a4c] text-gray-900 dark:text-white">
      {children}
    </div>
  );
}
