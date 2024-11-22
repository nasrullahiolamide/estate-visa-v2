import {
  Accordion,
  ActionIcon,
  Anchor,
  AppShell,
  Button,
  Checkbox,
  Drawer,
  Flex,
  InputWrapper,
  MantineThemeComponents,
  Menu,
  MultiSelect,
  NavLink,
  NumberInput,
  PinInput,
  Progress,
  RadioCard,
  Select,
  Stack,
  Stepper,
  Tabs,
  TextInput,
  Textarea,
  UnstyledButton,
} from "@mantine/core";
import { DateInput, DateTimePicker, TimeInput } from "@mantine/dates";

import actionIcon from "./action-icon.module.css";
import appShell from "./app-shell.module.css";
import anchor from "./anchor.module.css";
import button from "./button.module.css";
import dateInput from "./date-input.module.css";
import datePickerInput from "./date-picker-input.module.css";
import dateTimePicker from "./date-time-picker.module.css";
import drawer from "./drawer.module.css";
import flex from "./flex.module.css";
import inputWrapper from "./input-wrapper.module.css";
import menu from "./menu.module.css";
import multiSelect from "./multi-select.module.css";
import navlink from "./navlink.module.css";
import numberInput from "./number-input.module.css";
import passwordInput from "./password-input.module.css";
import progress from "./progress.module.css";
import radioCard from "./radio-card.module.css";
import select from "./select.module.css";
import stack from "./stack.module.css";
import tabs from "./tabs.module.css";
import textInput from "./text-input.module.css";
import textarea from "./textarea.module.css";
import timeInput from "./time-input.module.css";
import {
  ArrowDownIcon,
  CalenderIcon,
  CancelCircleIcon,
  ClockIcon,
} from "@/icons";

export const components: MantineThemeComponents = {
  InputWrapper: InputWrapper.extend({
    classNames: inputWrapper,
  }),

  DateTimePicker: DateTimePicker.extend({
    defaultProps: {
      size: "lg",
      variant: "default",
    },
    classNames: dateTimePicker,
  }),

  Drawer: Drawer.extend({
    defaultProps: {
      keepMounted: true,
      lockScroll: true,
      position: "right",
      size: 700,
      closeButtonProps: {
        icon: <CancelCircleIcon />,
      },
      overlayProps: { backgroundOpacity: 0.35 },
    },
    classNames: drawer,
  }),

  NumberInput: NumberInput.extend({
    defaultProps: {
      size: "lg",
      variant: "default",
    },
    classNames: numberInput,
  }),

  TextInput: TextInput.extend({
    defaultProps: {
      size: "sm",
      variant: "default",
    },
    classNames: textInput,
  }),

  DateInput: DateInput.extend({
    defaultProps: {
      size: "lg",
      variant: "default",
      rightSection: <CalenderIcon />,
    },
    classNames: dateInput,
  }),
  NavLink: NavLink.extend({
    classNames: navlink,
  }),

  ActionIcon: ActionIcon.extend({
    classNames: actionIcon,
  }),

  AppShell: AppShell.extend({
    classNames: appShell,
  }),

  TimeInput: TimeInput.extend({
    defaultProps: {
      size: "lg",
      variant: "default",
      rightSection: <ClockIcon />,
    },
    classNames: timeInput,
  }),

  DatePickerInput: DateTimePicker.extend({
    defaultProps: {
      size: "sm",
      variant: "default",
      rightSection: <CalenderIcon />,
    },
    classNames: datePickerInput,
  }),

  Textarea: Textarea.extend({
    defaultProps: {
      variant: "default",
      resize: "vertical",
      minRows: 8,
      autosize: true,
    },
    classNames: textarea,
  }),

  PasswordInput: TextInput.extend({
    defaultProps: {
      size: "sm",
      type: "password",
      variant: "default",
    },
    classNames: passwordInput,
  }),

  Select: Select.extend({
    defaultProps: {
      size: "lg",
      searchable: false,
      variant: "default",
      clearable: false,
      rightSection: <ArrowDownIcon />,
      classNames: {
        option: "hover:bg-purple-4 text-sm",
        input: "text-sm",
        options: "text-sm",
        error: "text-xs",
      },
    },
    classNames: select,
  }),

  MultiSelect: MultiSelect.extend({
    defaultProps: {
      size: "lg",
      variant: "default",
      rightSection: <ArrowDownIcon />,
      classNames: {
        option: "hover:bg-purple-4 text-sm",
      },
    },
    classNames: multiSelect,
  }),

  Button: Button.extend({
    defaultProps: {
      size: "lg",
      fz: "md",
      fw: 500,
    },

    classNames: button,
  }),

  Checkbox: Checkbox.extend({
    defaultProps: {
      radius: "sm",
      styles: {
        input: {
          cursor: "pointer",
        },
      },
    },
  }),

  PinInput: PinInput.extend({
    defaultProps: {
      length: 6,
      inputMode: "numeric",
      mask: true,
      placeholder: "0",
    },
  }),

  Stack: Stack.extend({
    defaultProps: {
      align: "stretch",
    },
    classNames: stack,
  }),

  Tabs: Tabs.extend({
    defaultProps: {
      classNames: tabs,
    },
  }),

  Flex: Flex.extend({
    defaultProps: {
      classNames: flex,
    },
  }),

  Menu: Menu.extend({
    defaultProps: {
      position: "bottom-start",
      classNames: menu,
    },
  }),

  UnstyledButton: UnstyledButton.extend({
    defaultProps: {
      classNames: {
        root: "mantine-active",
      },
    },
  }),

  Progress: Progress.extend({
    classNames: progress,
  }),

  RadioCard: RadioCard.extend({
    classNames: radioCard,
  }),

  Anchor: Anchor.extend({
    classNames: anchor,
  }),
};
