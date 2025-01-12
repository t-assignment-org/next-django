import React from "react";

interface MainProps extends React.PropsWithChildren {}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center flex-col space-y-16 h-screen">
      {children}
    </div>
  );
};

export default Main;
