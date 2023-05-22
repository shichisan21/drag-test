import { FC, ReactElement } from "react";
import { useRouter } from "next/router";

interface AboutProps {
  fruits: string[];
}

const About: FC<AboutProps> = ({ fruits }): ReactElement => {
  return (
    <div>
      <h1>test sssAbout</h1>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};

const AboutWrapper: FC = (): ReactElement => {
  const router = useRouter();
  const { fruits } = router.query;
  return <About fruits={fruits as string[]} />;
};

export default AboutWrapper;
