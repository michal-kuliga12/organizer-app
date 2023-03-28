import react, { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url: string, body: object | null | Date, method: string) => {
  const [data, setData] = useState<object | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(url, body, method);
  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await axios({
          method: method,
          url: url,
          data: { params: body },
        });
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    dataFetch();
  }, [url]);
  const reFetch = async () => {
    try {
      const response = await axios({
        method: method,
        url: url,
        data: { params: body },
      });
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  return { data, loading, error, reFetch };
};
export default useFetch;
