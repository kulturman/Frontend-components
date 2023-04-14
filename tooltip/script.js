const toolTip = createToolTip();

document.addEventListener('mouseup', e => {
  const selection = document.getSelection();
  const { anchorNode, focusNode, focusOffset, anchorOffset } = selection;

  if (anchorNode != focusNode) {
    // Cross-paragraph selection
    return;
  }

  if (anchorOffset - focusOffset === 0) {
    closeToolTip();
    return;
  }

  const coordinates = selection.getRangeAt(0).getClientRects()[0];
  const toolTipAbosulatePosition = getToolTipAbsolutePosition(coordinates);
  displayToolTip(toolTipAbosulatePosition);
});

function closeToolTip() {
  toolTip.style.top = `-200px`;
  toolTip.style.left = `-300px`;
}

function displayToolTip(toolTipAbsolutePosition) {
  document.body.appendChild(toolTip);
  const tooltipTriangle = document.querySelector(".tooltip__arrow");
  toolTip.style.top = `calc(${toolTipAbsolutePosition.y}px - ${toolTip.clientHeight}px - ${tooltipTriangle.offsetHeight / 2}px)`;
  toolTip.style.left = `calc(${toolTipAbsolutePosition.x}px - ${toolTip.clientWidth / 2}px)`;
}

function createToolTip() {
  const toolTip = document.createElement("div");
  toolTip.style.position = "absolute";
  toolTip.classList.add("tooltip");
  toolTip.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="tooltip__arrow"></div>
    <svg class="tooltip__icon">
      <path
        d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z"
        fill-rule="evenodd"
      ></path>
    </svg>
    <svg class="tooltip__icon">
      <path
        d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z"
        fill-rule="evenodd"
      ></path>
    </svg>
    <svg class="tooltip__icon">
      <path
        d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z"
        fill-rule="evenodd"
      ></path>
    </svg>
    <svg class="tooltip__icon">
      <path
        d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z"
        fill-rule="evenodd"
      ></path>
    </svg>
  `
  );

  return toolTip;
}

function getToolTipAbsolutePosition(coordinates) {
  return {
    x: coordinates.x + coordinates.width / 2,
    y: coordinates.y,
  };
}
