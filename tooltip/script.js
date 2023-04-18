const toolTip = createToolTip();
const articleElement = document.querySelector('.article');
let isSelectionPending = false;

document.addEventListener('click', e => {
  const editButton = e.target.closest('.tooltip__icon--edit');
  
  if (editButton) {
    const { selection, selectedText } = getSelectionData();
    const { anchorNode, anchorOffset, focusOffset } = selection;
    const wholeText = selection.anchorNode.data;
    const childNodes = anchorNode.parentElement.childNodes;
    const parent = selection.anchorNode.parentNode;
    const clonedNode = document.createElement(parent.nodeName);

    Array.from(childNodes).forEach(node => {
      if (node === anchorNode) {
        //We need to split text in three parts and create nodes
        const firstPart = wholeText.substring(0, anchorOffset);
        const lastPart = wholeText.substring(focusOffset);
        clonedNode.insertAdjacentHTML('beforeend', `${firstPart}<mark class="highlited">${selectedText}</mark>${lastPart}`);
      }
      else {
        clonedNode.insertAdjacentHTML('beforeend', `${node.outerHTML || node.textContent}`);
      }
    });

    parent.replaceWith(clonedNode);
    closeToolTip();
  }
});

document.addEventListener('mouseup', e => {
  if (isSelectionPending) {
    const selectionData = getSelectionData();
    displayToolTip(getToolTipAbsolutePosition(selectionData.coordinates));
  }
  isSelectionPending = false;
});

function getSelectionData() {
  const selection = document.getSelection();
  const { anchorNode, focusOffset, anchorOffset } = selection;
  const coordinates = selection.getRangeAt(0).getClientRects()[0];

  return {
    selection,
    selectedText: anchorNode?.data?.substring(anchorOffset, focusOffset),
    coordinates,
  }
}

document.addEventListener('selectionchange', e => {
  const selectionData = getSelectionData();
  isSelectionPending = true;
  const { anchorNode, focusNode } = selectionData.selection;

  if (anchorNode != focusNode) {
    // Cross-paragraph selection
    return;
  }
  
  if (!selectionData.selectedText) {
    isSelectionPending = false;
    closeToolTip();
    return;
  }
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
    <svg class="tooltip__icon tooltip__icon--edit" xmlns="http://www.w3.org/2000/svg">
      <path id="Vector" d="M4 16.0001V20.0001L8 20.0001L18.8686 9.13146L18.8695 9.13061C19.265 8.73516 19.4628 8.53736 19.5369 8.3092C19.6021 8.10835 19.6022 7.89201 19.5369 7.69117C19.4627 7.46284 19.2646 7.26474 18.8686 6.86872L17.1288 5.12892C16.7345 4.7346 16.5369 4.53704 16.3091 4.46301C16.1082 4.39775 15.8919 4.39775 15.691 4.46301C15.463 4.53709 15.2652 4.73488 14.8704 5.12976L14.8686 5.13146L4 16.0001Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
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
