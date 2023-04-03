import react, { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url: string, body: object | null | Date, method: string) => {
  const [data, setData] = useState<object | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const reFetch = () => {
    console.log("refetched");
  };
  useEffect(() => {
    const dataFetch = async () => {
      setLoading(true);
      try {
        const response = await axios({
          method: method,
          url: url,
          data: { params: body },
        });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    dataFetch();
  }, [url]);
  return { data, loading, error, reFetch };
};
export default useFetch;
