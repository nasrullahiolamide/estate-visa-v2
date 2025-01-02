let frame, dragIcon, toggle;
let xHorizontalPosition = 0,
  yVerticalPosition = 0,
  horizontalPosition = 0,
  verticalPosition = 0;

const observer = new MutationObserver(() => {
  frame = document.getElementById("fc_frame");
  toggle = document.getElementById("fc_frame_btn");

  if (frame) {
    setupDragIcon();
    setupFrameStyles();
    attachEventListeners();
    observeFrameAttributes();
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

function setupDragIcon() {
  dragIcon = document.createElement("img");
  dragIcon.src = "/vectors/drag.svg";
  dragIcon.style.cursor = "grab";
  dragIcon.style.position = "absolute";
  dragIcon.style.top = "0px";
  dragIcon.style.left = "0px";
  dragIcon.style.pointerEvents = "none";

  if (frame.firstChild) {
    frame.insertBefore(dragIcon, frame.firstChild);
  } else {
    frame.append(dragIcon);
  }
}

function setupFrameStyles() {
  frame.style.zIndex = "9999";
  frame.style.backgroundColor = "red";
}

function attachEventListeners() {
  const dragStartHandler = (ev) => dragMouseDown(ev);

  dragIcon.addEventListener("touchstart", dragStartHandler);
  frame.addEventListener("touchstart", dragStartHandler, { passive: false });

  frame.addEventListener("click", (ev) => {
    console.log("Frame clicked!");
    if (ev.target !== frame) {
      console.log("Child clicked:", ev.target);
      // Perform child-specific actions here if needed
    }
  });
}

function observeFrameAttributes() {
  const frameObserver = new MutationObserver((mutationsList) => {
    console.log(frame.target);
  });

  frameObserver.observe(frame, { attributes: true });
}

function dragMouseDown(ev) {
  if (ev.type === "touchstart") {
    ev.preventDefault();
    ev = ev.touches[0];
  }

  if (dragIcon) {
    dragIcon.style.cursor = "grabbing";
  }

  horizontalPosition = ev.clientX;
  verticalPosition = ev.clientY;

  document.addEventListener("touchmove", elementDrag, { passive: false });
  document.addEventListener("touchend", closeDragElement, { passive: false });
}

function elementDrag(ev) {
  if (ev.type === "touchmove") {
    ev.preventDefault();
    ev = ev.touches[0];
  }

  xHorizontalPosition = horizontalPosition - ev.clientX;
  yVerticalPosition = verticalPosition - ev.clientY;
  horizontalPosition = ev.clientX;
  verticalPosition = ev.clientY;

  if (frame) {
    frame.style.top = frame.offsetTop - yVerticalPosition + "px";
    frame.style.left = frame.offsetLeft - xHorizontalPosition + "px";
  }
}

function closeDragElement() {
  document.removeEventListener("touchmove", elementDrag);
  document.removeEventListener("touchend", closeDragElement);

  if (dragIcon) {
    dragIcon.style.cursor = "grab";
  }

  if (frame) {
    const { left, height, top } = frame.getBoundingClientRect();
    const halved = window.innerWidth / 2;

    frame.style.left = left >= halved ? "" : "15px";

    if (top > window.innerHeight - height) frame.style.top = "";
    if (top < 15) frame.style.top = "15px";
  }
}
