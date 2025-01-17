import { Button, ButtonProps, Divider, Flex, Menu, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ArrowDown2 } from "iconsax-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface FlowGroupButtonsAttributes
  extends ButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonProps> {
  children: ReactNode;
}

type FlowFormButtons = FlowGroupButtonsAttributes;

interface FlowGroupButtons {
  label?: string;
  buttons: {
    name: string;
    icon: any;
    type: string;
    onClick?: () => void;
    default?: boolean;
  }[];
}

export function FlowGroupButtons({ buttons }: FlowGroupButtons) {
  const hover = useForm({
    initialValues: { hovered: false, iconIndex: null as number | null },
  });

  const defaultButton = buttons.find((button) => button.default);

  return (
    <Button.Group
      bg='light-blue.5'
      className='rounded-md w-full'
      component={Flex}
    >
      <Button
        fz={14}
        flex={1}
        fw={500}
        onClick={defaultButton?.onClick}
        leftSection={defaultButton?.icon}
      >
        {defaultButton?.name}
      </Button>
      <Divider orientation='vertical' color='#F5F5F6' />
      <Menu position='bottom-end'>
        <Menu.Target>
          <Button px='sm'>
            <ArrowDown2 size='16' />
          </Button>
        </Menu.Target>
        <Menu.Dropdown p={0}>
          {buttons.map((option, i) => {
            if (option.default) return null;
            return (
              <Menu.Item key={option.name} p={0}>
                <Flex
                  wrap='wrap'
                  gap='sm'
                  key={option.name}
                  className='p-3 cursor-pointer hover:bg-purple-7 hover:bg-opacity-30 w-full'
                  onClick={option.onClick}
                  onMouseEnter={() =>
                    hover.setValues((values) => ({
                      ...values,
                      hovered: true,
                      iconIndex: i,
                    }))
                  }
                  onMouseLeave={() =>
                    hover.setValues((values) => ({
                      ...values,
                      hovered: false,
                      iconIndex: null,
                    }))
                  }
                >
                  {/* <option.icon
                  width='16'
                  color='blue'
                  // variant={
                  //   hover.values.hovered && hover.values.iconIndex === i
                  //     ? "Bold"
                  //     : "Outline"
                  // }
                /> */}
                  <Text className='text-sm'> {option.name}</Text>
                </Flex>
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      </Menu>
    </Button.Group>
  );
}
