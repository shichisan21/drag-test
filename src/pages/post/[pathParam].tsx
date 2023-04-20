import { useRouter } from "next/router";

const TestPathParam = () => {
  const router = useRouter();
  const { pathParam } = router.query;
  return (
    <div>
      <h1>testPathParam</h1>
      <p>{pathParam}</p>
    </div>
  );
};

export default TestPathParam;
