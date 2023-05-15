import { FC } from "react";

interface CityData {
  [key: string]: string | undefined;
}
interface GroupData {
  date: string;
  group: string;
  city: CityData[];
}

// Define DateGenerateProps
interface DateGenerateProps {
  data: GroupData[];
}

export const DateGenerate: FC<DateGenerateProps> = ({ data }) => {
  console.log(data);
  return (
    <div>
      <h1>receive</h1>
    </div>
  );
};
