import { LoadingOverlay } from "@mantine/core";

export function SuspenseOverlay() {
  return (
    <LoadingOverlay
      visible
      opacity={0.8}
      bg='accent.10'
      overlayProps={{
        bg: "accent.10",
      }}
      loaderProps={{
        color: "white",
      }}
    />
  );
}