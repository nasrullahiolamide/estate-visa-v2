let frame, dragIcon;
let xHorizontalPosition = 0,
  yVerticalPosition = 0,
  horizontalPosition = 0,
  verticalPosition = 0;

const observer = new MutationObserver(() => {
  frame = document.getElementById("fc_frame");

  if (frame) {
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
      frame.appendChild(dragIcon);
    }

    dragIcon.addEventListener("mousedown", (ev) => {
      ev.stopPropagation();
      dragMouseDown(ev);
    });

    frame.addEventListener("mousedown", dragMouseDown, { passive: false });

    const frameObserver = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        const { type, attributeName } = mutation;

        if (type === "attributes" && attributeName === "class") {
          if (frame.classList.contains("fc-open")) {
            frame.style.top = "";
          }
        }
      }
    });

    frameObserver.observe(frame, { attributes: true });

    // Stop observing for the frame
    observer.disconnect();
  }
});

// Start observing the document body for changes
observer.observe(document.body, { childList: true, subtree: true });

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
  document.addEventListener("mousemove", elementDrag, { passive: false });
  document.addEventListener("mouseup", closeDragElement);

  document.addEventListener("touchmove", elementDrag, { passive: false });
  document.addEventListener("touchend", closeDragElement, { passive: false });
}

function elementDrag(ev) {
  if (ev.type === "touchmove") {
    ev.preventDefault();
    ev = ev.touches[0];
  }

  if (dragIcon) {
    dragIcon.style.cursor = "grabbing";
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
  if (dragIcon) {
    document.removeEventListener("mouseup", closeDragElement);
    document.removeEventListener("mousemove", elementDrag);

    document.removeEventListener("touchmove", elementDrag);
    document.removeEventListener("touchend", closeDragElement);

    if (frame) {
      const { left, height, top } = frame.getBoundingClientRect();

      const halved = window.innerWidth / 2;
      frame.style.left = left >= halved ? "" : "15px";

      if (top > window.innerHeight - height) frame.style.top = "";
      if (top < 15) frame.style.top = "15px";
    }
  }
}
