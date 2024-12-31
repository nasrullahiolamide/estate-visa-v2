const frame = document.getElementById("fc_frame");
const dragIcon = document.createElement("img");

if (frame) {
  dragIcon.src = "/vectors/drag.svg";

  dragIcon.style.cursor = "grab";
  dragIcon.style.position = "absolute";
  dragIcon.style.top = "0px";
  dragIcon.style.left = "0px";

  if (frame.firstChild) {
    frame.insertBefore(dragIcon, frame.firstChild);
  } else {
    frame.appendChild(dragIcon);
  }

  frame.addEventListener("touchstart", dragMouseDown, { passive: false });

  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      const { type, attributeName } = mutation;

      if (type == "attributes" && attributeName == "class") {
        if (frame.classList.contains("fc-open")) frame.style.top = "";
      }
    }
  });

  observer.observe(frame, { attributes: true });
}

let xHorizontalPosition = 0,
  yVerticalPosition = 0,
  horizontalPosition = 0,
  verticalPosition = 0;

function dragMouseDown(ev) {
  if (ev.type === "touchstart") {
    ev.preventDefault();
    ev = ev.touches[0];
  }

  dragIcon.style.cursor = "grabbing";

  horizontalPosition = ev.clientX;
  verticalPosition = ev.clientY;

  document.addEventListener("touchmove", elementDrag, { passive: false });
  document.addEventListener("touchend", closeDragElement);
}

function elementDrag(ev) {
  if (ev.type === "touchmove") {
    ev.preventDefault();
    ev = ev.touches[0];
  }

  dragIcon.style.cursor = "grabbing";

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
  dragIcon.style.cursor = "grab";
  document.removeEventListener("touchend", closeDragElement);
  document.removeEventListener("touchmove", elementDrag);

  const { left, height, top } = frame.getBoundingClientRect();

  const halved = window.innerWidth / 2;
  frame.style.left = left >= halved ? "" : "15px";

  if (top > window.innerHeight - height) frame.style.top = "";
  if (top < 15) frame.style.top = "15px";
}
