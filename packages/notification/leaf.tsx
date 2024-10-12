import { Box, Group, RenderTreeNodePayload } from "@mantine/core";
import { ArrowDown3, ArrowRight3, Settings } from "iconsax-react";

interface FileIconProps {
  name?: string;
  expanded: boolean;
}

function FileIcon({ name, expanded }: FileIconProps) {
  if (name) {
    return expanded ? (
      <ArrowDown3 color="currentColor" size="16" />
    ) : (
      <ArrowRight3 color="currentColor" size="16" />
    );
  }

  return null;
}

export function Leaf({
  node,
  expanded,
  hasChildren,
  elementProps,
}: RenderTreeNodePayload) {
  return (
    <Group wrap="nowrap" gap={4} align="start" {...elementProps}>
      <Box py={2}>
        {hasChildren ? (
          <FileIcon name={node.value} expanded={expanded} />
        ) : (
          <Settings size="16" />
        )}
      </Box>
      <span>{node.label}</span>
    </Group>
  );
}
