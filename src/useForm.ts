import { type ChangeEvent, useCallback, useState } from "react";

export default function useForm<T>(initialData?: T | null) {
  const [formData, setFormData] = useState<T>(initialData ?? ({} as T));

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const incomingValue =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;

      return setFormData((current) => ({
        ...current,
        // TODO: Check that `name` exists on `T`.
        [e.target.name]: incomingValue,
      }));
    },
    [],
  );

  return {
    data: formData,
    handleChange,
  };
}
