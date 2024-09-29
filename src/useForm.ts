import { type ChangeEvent, useCallback, useState } from "react";

export default function useForm<T>(initialData?: T | null) {
  const [formData, setFormData] = useState<T>(initialData ?? ({} as T));

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setFormData((current) => ({
        ...current,
        // TODO: Check that `name` exists on `T`.
        [e.target.name]: e.target.value.trim(),
      })),
    [],
  );

  return {
    data: formData,
    handleChange,
  };
}
