import {
  ClockIcon,
  DownloadIcon,
  ListIcon,
  NotesIcon,
  UploadIcon,
} from "@/icons";
import { DragIcon } from "@/icons/drag";
import {
  Button,
  ButtonProps,
  PolymorphicComponentProps,
  Stack,
  StackProps,
  Tooltip,
  Transition,
} from "@mantine/core";
import { Add, ArrowDown2, ArrowUp2 } from "iconsax-react";
import { max, min } from "mathjs";
import {
  ElementType,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { FilterData, FilterDropdown } from "../shared/interface/dropdowns";

enum IconType {
  FILTER = "filter",
  UPLOAD = "upload",
  DOWNLOAD = "download",
  ADD = "add",
  NOTES = "notes",
  CLOCK = "clock",
  LIST = "list",
}

type Icon =
  | "upload"
  | "download"
  | "add"
  | "notes"
  | "clock"
  | "filter"
  | "list";

type Button = {
  icon: Icon;
  filterData?: FilterData;
  btnProps?: BtnProps;
  label?: string;
};

type BtnProps<T extends ElementType = "a"> = ButtonProps & {
  href?: string;
  onClick?: () => void;
} & PolymorphicComponentProps<T>;

type FlowFloatingButtonsProps = StackProps & { buttons: Button[] };

export function FlowFloatingButtons({
  buttons,
  hidden,
  ...containerProps
}: FlowFloatingButtonsProps) {
  const [visible, setVisible] = useState(true);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const dragIconRef = useRef<HTMLButtonElement | null>(null);

  const [dragging, setDragging] = useState(false);

  const view: Record<PropertyKey, ReactNode> = {
    [IconType.ADD]: <Add size={24} />,
    [IconType.DOWNLOAD]: <DownloadIcon width={16} height={16} />,
    [IconType.UPLOAD]: <UploadIcon width={15} height={15} />,
    [IconType.NOTES]: <NotesIcon width={20} height={20} />,
    [IconType.CLOCK]: <ClockIcon width={20} height={20} />,
    [IconType.LIST]: <ListIcon width={20} height={20} />,
  };

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (frame) {
      frame.style.bottom = "45px";
      frame.style.right = "12px";
    }
  }, []);

  // Dragging logic
  useEffect(() => {
    const frame = frameRef.current;
    const dragIcon = dragIconRef.current;
    if (!frame || !dragIcon) return;

    let offsetX = 0;
    let offsetY = 0;

    const onMouseDown = (ev: MouseEvent | TouchEvent) => {
      setDragging(true);

      if (frame && !dragging) {
        frame.style.bottom = "auto";
        frame.style.right = "auto";
      }

      if (ev instanceof MouseEvent) {
        offsetX = ev.clientX - frame.offsetLeft;
        offsetY = ev.clientY - frame.offsetTop;
      } else if (ev instanceof TouchEvent) {
        offsetX = ev.touches[0].clientX - frame.offsetLeft;
        offsetY = ev.touches[0].clientY - frame.offsetTop;
      }

      frame.style.cursor = "grabbing";
    };

    const onMouseMove = (ev: MouseEvent | TouchEvent) => {
      if (!dragging) return;

      let clientX = 0;
      let clientY = 0;

      if (ev instanceof MouseEvent) {
        clientX = ev.clientX;
        clientY = ev.clientY;
      } else if (ev instanceof TouchEvent) {
        clientX = ev.touches[0].clientX;
        clientY = ev.touches[0].clientY;
      }

      let xOffset = clientX - offsetX;
      let yOffset = clientY - offsetY;

      const minX = 0;
      const maxX = window.innerWidth - frame.offsetWidth;
      xOffset = max(minX, min(maxX, xOffset));

      frame.style.left = `${xOffset}px`;
      frame.style.top = `${yOffset}px`;

      ev.preventDefault();
    };

    const closeDragElement = () => {
      setDragging(false);

      frame.style.cursor = "grab";

      const { left, height, top } = frame.getBoundingClientRect();
      const halved = window.innerWidth / 2;

      frame.style.left =
        left >= halved
          ? `${window.innerWidth - frame.offsetWidth - 15}px`
          : "15px";
      if (top > window.innerHeight - height)
        frame.style.top = `${window.innerHeight - height - 15}px`;
      if (top < 15) frame.style.top = "15px";
    };

    frame.addEventListener("mousedown", onMouseDown);
    frame.addEventListener("touchstart", onMouseDown);
    document.addEventListener("mousemove", onMouseMove, { passive: false });
    document.addEventListener("touchmove", onMouseMove, { passive: false });
    document.addEventListener("mouseup", closeDragElement);
    document.addEventListener("touchend", closeDragElement);

    // Cleanup event listeners
    return () => {
      frame.removeEventListener("mousedown", onMouseDown);
      frame.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("touchend", closeDragElement);
    };
  }, [dragging]);

  return (
    <Stack
      ref={frameRef}
      style={{
        position: "absolute",
        width: "fit-content",
        height: "fit-content",
        zIndex: 200,
        cursor: dragging ? "grabbing" : "grab", // Update cursor based on dragging state
      }}
      hidden={hidden}
      className='lg:hidden'
      {...containerProps}
    >
      <Stack justify='center' align='center'>
        {buttons?.map(({ icon, btnProps, filterData, label }, index) => (
          <Transition
            key={icon}
            mounted={visible}
            transition='slide-up'
            duration={300}
            timingFunction='ease'
            enterDelay={index * 50}
          >
            {(styles) => (
              <Tooltip label={label ?? icon} tt='capitalize' fz={14}>
                {icon === IconType.FILTER ? (
                  <FilterDropdown
                    showLabel={false}
                    data={filterData as FilterData}
                    style={styles}
                    hidden={hidden}
                  />
                ) : (
                  <Button
                    radius='md'
                    w={40}
                    h={40}
                    p={0}
                    variant='outline'
                    bg='white'
                    className='shadow-lg'
                    style={styles}
                    {...btnProps}
                    onClick={() => {
                      setVisible(false);
                      btnProps?.onClick?.();
                    }}
                    hidden={icon !== IconType.UPLOAD ? hidden : false}
                  >
                    {view[icon]}
                  </Button>
                )}
              </Tooltip>
            )}
          </Transition>
        ))}
      </Stack>

      <DragIcon
        style={{
          position: "absolute",
          cursor: "grab",
          display: visible ? "none" : "block",
        }}
      />

      <Button
        ref={dragIconRef}
        radius='xl'
        w={50}
        h={50}
        p={0}
        className='shadow-lg z-10'
        onClick={() => setVisible((prev) => !prev)}
      >
        {!visible ? <ArrowUp2 size={24} /> : <ArrowDown2 size={24} />}
      </Button>
    </Stack>
  );
}
