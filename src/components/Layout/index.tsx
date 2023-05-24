import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-screen min-h-screen mx-auto px-[18rem] bg-gradient-to-r from-blue-200 to-purple-300">
      {children}
    </div>
  );
};
