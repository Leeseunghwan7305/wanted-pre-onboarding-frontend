import { useCallback, useState } from "react";

type UseInputReturnType<T> = [
  T,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  boolean,
  React.Dispatch<React.SetStateAction<T>>
];

const useInput = <T>(
  initialValue: T,
  validation?: (value: T) => boolean
): UseInputReturnType<T> => {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<boolean>(true);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value as unknown as T;
      console.log(newValue);
      if (validation && !validation(newValue)) {
        setError(true);
      } else {
        setError(false);
      }

      setValue(newValue);
    },
    [validation]
  );

  return [value, onChange, error, setValue];
};

export default useInput;
