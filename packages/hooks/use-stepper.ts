import { UseFormReturnType } from "@mantine/form";
import { useCounter } from "@mantine/hooks";
import { size } from "lodash";

export type StepContent<T extends Record<PropertyKey, unknown>> = Record<
  number,
  Array<keyof T>
>;

export type UseStepper<T extends Record<PropertyKey, unknown>> = {
  content: StepContent<T>;
  form: UseFormReturnType<T>;
};

export function useStepper<T extends Record<PropertyKey, unknown>>({
  content,
  form,
}: UseStepper<T>) {
  const max = size(content) - 1;
  const [active, handlers] = useCounter(0, { min: 0, max });

  function checkForErrors() {
    const errors = { ...form.validate().errors };
    const hasErrors = content[active].some((f) => f in errors);
    if (hasErrors) return true;
    form.clearErrors();
  }

  function next() {
    const hasErrors = checkForErrors();
    if (!hasErrors) {
      handlers.increment();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function previous() {
    handlers.decrement();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return { active, next, previous, max };
}
