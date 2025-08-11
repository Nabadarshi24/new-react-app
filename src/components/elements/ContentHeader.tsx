import { ReactNode } from "react";

type TypeProps = {
  title: string;
  children?: ReactNode;
};

export const ContentHeader = ({
  title,
  children
}: TypeProps) => {

  return (
    <div className="page-header">
      <h1 className="page-title">{title}</h1>
      {children}
    </div>
  );
};
