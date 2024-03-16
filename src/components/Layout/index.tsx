import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-screen min-h-screen mx-auto tablet:px-[18rem] bg-gradient-to-r from-slate-200 bg-sky-100">
      {children}
    </div>
  );
};
