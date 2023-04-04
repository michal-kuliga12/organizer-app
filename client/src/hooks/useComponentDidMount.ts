import { useRef, useEffect } from "react";
export const useComponentDidMount = () => {
  const ref = useRef<Boolean>();
  useEffect(() => {
    ref.current = true;
  }, []);
  return ref.current;
};
