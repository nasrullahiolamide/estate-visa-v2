"use client";

import { HouseData } from "@/builders/types/houses";
import { PAGES } from "@/packages/libraries";
import {
  ActionIcon,
  Box,
  CopyButton,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Eye, EyeSlash } from "iconsax-react";
import Link from "next/link";
import { useState } from "react";

// CSS keyframes for pulse animation
const pulseKeyframes = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
      box-shadow: 0 0 0 3px var(--mantine-color-green-1), 0 2px 8px rgba(34, 197, 94, 0.3);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.2);
      box-shadow: 0 0 0 6px var(--mantine-color-green-1), 0 4px 16px rgba(34, 197, 94, 0.5);
    }
  }
`;

// Inject the keyframes into the document head
if (
  typeof document !== "undefined" &&
  !document.getElementById("pulse-animation")
) {
  const style = document.createElement("style");
  style.id = "pulse-animation";
  style.textContent = pulseKeyframes;
  document.head.appendChild(style);
}

interface HouseCodeDisplayProps {
  isActive: boolean;
  house: HouseData | null;
  size?: "sm" | "md" | "lg";
}

const MASKED_CODE = "•••• ••••";

export function HouseCodeDisplay({
  isActive,
  house,
  size = "md",
}: HouseCodeDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const houseCode = house?.houseCode || MASKED_CODE;

  const formatHouseCode = (code: string) => {
    if (code === MASKED_CODE) return code;
    // Format as XXXX-XXXX for better readability
    return code.replace(/(.{4})/g, "$1-").replace(/-$/, "");
  };

  const displayCode = isVisible ? formatHouseCode(houseCode) : "3333-3333";

  const handleCopySuccess = () => {
    notifications.show({
      title: "✅ Success!",
      message: `House code "${formatHouseCode(houseCode)}" copied to clipboard`,
      color: "green",
      autoClose: 3000,
    });
  };

  const getSizeConfig = () => {
    switch (size) {
      case "sm":
        return {
          padding: "8px 12px",
          fontSize: "12px",
          labelFontSize: "10px",
          iconSize: "16px",
          borderRadius: "8px",
          gap: "6px",
        };
      case "lg":
        return {
          padding: "12px 18px",
          fontSize: "16px",
          labelFontSize: "13px",
          iconSize: "20px",
          borderRadius: "12px",
          gap: "8px",
        };
      default: // md
        return {
          padding: "10px 16px",
          fontSize: "14px",
          labelFontSize: "11px",
          iconSize: "18px",
          borderRadius: "10px",
          gap: "8px",
        };
    }
  };

  const sizeConfig = getSizeConfig();

  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: sizeConfig.gap,
    padding: sizeConfig.padding,
    backgroundColor: isActive
      ? "var(--mantine-color-green-1)"
      : "var(--mantine-color-red-1)",
    border: `1px solid ${
      isActive ? "var(--mantine-color-green-9)" : "var(--mantine-color-red-9)"
    }`,
    borderRadius: sizeConfig.borderRadius,
    cursor: houseCode !== MASKED_CODE ? "pointer" : "default",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "visible",
  };

  const statusIndicatorStyle: React.CSSProperties = {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: isActive
      ? "var(--mantine-color-green-5)"
      : "var(--mantine-color-red-5)",
    animation: isActive
      ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      : "none",
    boxShadow: isActive
      ? `0 0 0 3px var(--mantine-color-green-1), 0 2px 8px rgba(34, 197, 94, 0.3)`
      : `0 0 0 3px var(--mantine-color-red-1), 0 2px 8px rgba(239, 68, 68, 0.3)`,
    border: "2px solid white",
    zIndex: 10,
    transition: "all 0.3s ease",
  };

  return (
    <CopyButton
      value={houseCode !== MASKED_CODE ? houseCode : ""}
      timeout={2000}
    >
      {({ copied, copy }) => (
        <Tooltip
          label={
            houseCode !== MASKED_CODE
              ? copied
                ? "Copied!"
                : "Click to copy house code"
              : "No house code available"
          }
          disabled={houseCode === MASKED_CODE}
        >
          <Box
            style={containerStyle}
            onClick={() => {
              if (houseCode !== MASKED_CODE) {
                copy();
                handleCopySuccess();
              }
            }}
          >
            {/* Eye icon for toggle visibility */}
            <ActionIcon
              size={sizeConfig.iconSize}
              variant='transparent'
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(!isVisible);
              }}
              style={{
                flexShrink: 0,
                opacity: 0.7,
              }}
            >
              {isVisible ? (
                <Eye color={isActive ? "green" : "red"} />
              ) : (
                <EyeSlash color={isActive ? "green" : "red"} />
              )}
            </ActionIcon>

            {/* Content */}
            <Stack style={{ flex: 1, minWidth: 0 }} gap={3}>
              <Text
                size={sizeConfig.labelFontSize}
                fw={600}
                c='dimmed'
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  lineHeight: 1.2,
                  marginBottom: "2px",
                }}
              >
                House Code
              </Text>
              <Text
                size={sizeConfig.fontSize}
                fw={700}
                ff='monospace'
                c={isActive ? "green.9" : "red.8"}
                style={{
                  letterSpacing: "1.5px",
                  userSelect: "none",
                  lineHeight: 1.2,
                  fontSize: sizeConfig.fontSize,
                }}
              >
                {isActive ? displayCode : "Expired"}
              </Text>
              {!isActive && (
                <Text
                  span
                  size={sizeConfig.labelFontSize}
                  fw={600}
                  c='red.8'
                  component={Link}
                  href={PAGES.DASHBOARD}
                  className='underline'
                >
                  Renew Subscription
                </Text>
              )}
            </Stack>

            {/* Status Indicator */}
            <Box style={statusIndicatorStyle} />
          </Box>
        </Tooltip>
      )}
    </CopyButton>
  );
}
