import { PropsWithChildren } from "react";

const Errors = ({ children }: PropsWithChildren) => {
  return (
    <p className="text-center my-4 text-red-600 bg-red-100 p-2 uppercase text-sm">
      {children}
    </p>
  );
};

export default Errors;
