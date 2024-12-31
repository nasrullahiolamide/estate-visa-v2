import { Title, TitleProps } from "@mantine/core";

interface FlowTitleProps extends TitleProps {}

export function FlowTitle({ children, ...props }: FlowTitleProps) {
  return (
    <Title
      order={2}
      className="prose-xl/medium text-primary-text-body"
      {...props}
    >
      {children}
    </Title>
  );
}
