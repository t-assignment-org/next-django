import React from "react";

interface MainProps extends React.PropsWithChildren {}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center flex-col space-y-16 my-16 mx-16">
      {children}
    </div>
  );
};

export default Main;
