import { LoadingOverlay } from "@mantine/core";

export function SuspenseOverlay() {
  return (
    <LoadingOverlay
      visible
      opacity={0.8}
      overlayProps={{
        bg: "accent.10",
        blur: 6,
      }}
      loaderProps={{
        color: "white",
      }}
    />
  );
}
