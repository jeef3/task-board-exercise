import {
  type ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useState,
} from "react";

type RootField = "__root__";
type Field<T> = RootField | keyof T;

interface FormError<T> {
  field: Field<T>;
  message: string;
}

interface FormState<T> {
  isSubmitting: boolean;
  submitCount: number;
  errors: FormError<T>[];
}

const initialState: FormState<unknown> = {
  isSubmitting: false,
  submitCount: 0,
  errors: [],
};

export default function useForm<T>(initialData?: T | null) {
  const [formData, setFormData] = useState<T>(initialData ?? ({} as T));
  const [formState, setFormState] = useState<FormState<T>>(initialState);

  const handleChange = useCallback(
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const incomingValue =
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value;

      return setFormData((current) => ({
        ...current,
        // TODO: Check that `name` exists on `T`.
        [e.target.name]: incomingValue,
      }));
    },
    [],
  );

  const handleSubmit = useMemo(
    () => (submitter: (data: T) => Promise<void>) => async (e: FormEvent) => {
      e.preventDefault();

      setFormState((s) => ({
        ...s,
        isSubmitting: true,
        submitCount: s.submitCount + 1,
        errors: [],
      }));

      await submitter(formData);

      setFormState((s) => ({ ...s, isSubmitting: false }));
    },
    [formData],
  );

  const setError = useCallback((field: Field<T>, message: string) => {
    setFormState((s) => ({ ...s, errors: [...s.errors, { field, message }] }));
  }, []);

  return {
    formData,
    formState,
    handleChange,
    handleSubmit,
    setError,
  };
}
