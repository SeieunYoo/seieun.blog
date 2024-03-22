import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-screen min-h-screen mx-auto px-5 tablet:px-[18rem]  bg-gradient-to-r from-slate-200 to-sky-100 dark:from-gray-400 dark:to-gray-700 text-black dark:text-white">
      {children}
    </div>
  );
};
