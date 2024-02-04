const button = document.querySelector('.btn');
let cardWrapper = document.querySelector('.card__wrapper');
let colorArray = [];

function newColor() {
  // hex range
  const hex = '0123456789ABCDEF';
  // new color
  let newColor = '#';

  for (let i = 0; i < 6; i++) {
    let random = Math.floor(Math.random() * 16);
    newColor += hex[random];
  }
  return newColor;
}

function generateColor() {
  colorArray = [];
  console.log(colorArray);
  for (let i = 0; i < 3; i++) {
    let color = newColor();
    colorArray.push(color);
    cardWrapper.appendChild(colorPaletteCardUI(color));
  }
  generateGradient();
}

function generateGradient() {
  if (cardWrapper.children.length == 4) {
    cardWrapper.removeChild(cardWrapper.lastElementChild);
  }

  let linerGradient = `linear-gradient(0deg, ${colorArray[0]},
    ${colorArray.length >= 2 ? colorArray[1] : ' '}
    ${colorArray.length == 3 ? ',' + colorArray[2] : ' '})`;
  cardWrapper.appendChild(colorPaletteCardUI(linerGradient, false));
}

function colorPaletteCardUI(color, isClickAble = true) {
  // create outer element
  const item = document.createElement('div');
  item.classList.add('card__item');

  //   create color  bar value
  const colorBar = document.createElement('div');
  colorBar.classList.add('color-bar');
  colorBar.style.background = color;

  //   create card for color value
  const colorNameDiv = document.createElement('span');
  colorNameDiv.classList.add('color-name');
  // create text node for color
  let colorName = document.createTextNode(color);

  // add text node to color name div
  colorNameDiv.appendChild(colorName);

  //   add color bar to item
  item.appendChild(colorBar);

  //   add color name to item
  item.appendChild(colorNameDiv);

  if (isClickAble) {
    item.classList.add('active', 'hover');
    item.addEventListener('click', handleCardClick);
  }

  return item;
}

function handleCardClick() {
  let selectedItem = this.children[1].textContent;

  if (colorArray.includes(selectedItem)) {
    if (colorArray.length <= 2) {
      return;
    }
    this.classList.remove('active');
    colorArray = colorArray.filter((item) => item != selectedItem);
  } else {
    this.classList.add('active');
    colorArray.push(selectedItem);
  }
  generateGradient();
  console.log(colorArray);
}

function resetUI() {
  let cardWrapper = document.querySelector('.card__wrapper');
  let child = cardWrapper.lastElementChild;
  while (child) {
    cardWrapper.removeChild(child);
    child = cardWrapper.lastElementChild;
  }
}

function handleColorUpdate() {
  resetUI();
  generateColor();
}

generateColor();

button.addEventListener('click', handleColorUpdate);

window.addEventListener('keydown', (e) => {
  if (e.key == ' ') {
    handleColorUpdate();
  }
});
