import { FC } from "react";

interface DateGenerateProps {
  groupHeaders: string[];
}

export const DateGenerate: FC<DateGenerateProps> = ({ groupHeaders }) => {
  return (
    <div>
      <h1>{groupHeaders}</h1>
    </div>
  );
};
