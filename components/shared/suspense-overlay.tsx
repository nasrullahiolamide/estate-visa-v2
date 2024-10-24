import { LoadingOverlay } from "@mantine/core";

export function SuspenseOverlay() {
  return (
    <LoadingOverlay
      visible
      bg='accent.10'
      overlayProps={{
        bg: "accent.10",
        blur: 2,
      }}
      loaderProps={{
        color: "white",
      }}
    />
  );
}
