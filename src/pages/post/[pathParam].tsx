import { useRouter, NextRouter } from "next/router";
import React, { FC } from "react";

interface TestPathParamProps {
  router: NextRouter;
}

const TestPathParam: FC<TestPathParamProps> = ({ router }) => {
  const { pathParam } = router.query;
  return (
    <div>
      <h1>testPathParam</h1>
      <p>{pathParam}</p>
    </div>
  );
};

export default TestPathParam;
