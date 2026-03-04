"use client";

import { Badge, Box } from "@mantine/core";

interface StatusIndicatorProps {
  status: "active" | "inactive" | "expired" | "suspended" | "expiring_soon";
  size?: "sm" | "md" | "lg";
}

export function StatusIndicator({ status, size = "md" }: StatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status.toLowerCase()) {
      case "active":
        return {
          dotColor: "var(--mantine-color-green-9)",
          text: "Active",
        };
      case "inactive":
      case "expired":
        return {
          dotColor: "var(--mantine-color-red-9)",
          text: status === "expired" ? "Expired" : "Inactive",
        };
      case "expiring_soon":
        return {
          dotColor: "var(--mantine-color-amber-9)",
          text: "Expiring Soon",
        };
      case "suspended":
        return {
          dotColor: "var(--mantine-color-gray-9)",
          text: "Suspended",
        };
      default:
        return {
          dotColor: "var(--mantine-color-gray-9)",
          text: "Unknown",
        };
    }
  };

  const config = getStatusConfig();

  const getSizeConfig = () => {
    switch (size) {
      case "sm":
        return {
          dotSize: 6,
          fontSize: "12px",
        };
      case "lg":
        return {
          dotSize: 10,
          fontSize: "14px",
        };
      default: // md
        return {
          dotSize: 8,
          fontSize: "13px",
        };
    }
  };

  const sizeConfig = getSizeConfig();

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Box
        style={{
          position: "relative",
          width: sizeConfig.dotSize + 4,
          height: sizeConfig.dotSize + 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            width: sizeConfig.dotSize,
            height: sizeConfig.dotSize,
            borderRadius: "50%",
            backgroundColor: config.dotColor,
            position: "absolute",
            animation: "pulse 2s infinite",
          }}
        />
        <Box
          style={{
            width: sizeConfig.dotSize / 2,
            height: sizeConfig.dotSize / 2,
            borderRadius: "50%",
            backgroundColor: "white",
            position: "relative",
            zIndex: 1,
            animation: "blink 1.5s infinite",
          }}
        />
      </Box>
      <Badge
        variant='filled'
        color={
          status === "active"
            ? "green"
            : status === "inactive" || status === "expired"
            ? "red"
            : status === "expiring_soon"
            ? "yellow"
            : "gray"
        }
        size={size}
        style={{
          fontWeight: 500,
        }}
      >
        {config.text}
      </Badge>
    </Box>
  );
}

// // CSS Animations
// const animations = `
// @keyframes pulse {
//   0% { opacity: 1; transform: scale(1); }
//   50% { opacity: 0.7; transform: scale(1.1); }
//   100% { opacity: 1; transform: scale(1); }
// }

// @keyframes blink {
//   0% { opacity: 1; }
//   50% { opacity: 0.3; }
//   100% { opacity: 1; }
// }
// `;

// // Inject the CSS
// if (typeof document !== "undefined") {
//   const style = document.createElement("style");
//   style.textContent = animations;
//   document.head.appendChild(style);
// }
