const button = document.querySelector('.btn');

const generateColor = () => {
  // hex range
  const hex = '0123456789ABCDEF';
  // new color
  let newColor = '#';

  for (let i = 0; i < 6; i++) {
    let random = Math.floor(Math.random() * 16);
    newColor += hex[random];
  }
  return newColor;
};

// const generateColorArray = () => {
//   const colorArray = [];
//   for (let i = 0; i < 3; i++) {
//     let newColor = generateColor();
//     colorArray.push(newColor);
//   }
//   return colorArray;
// };

const colorPaletteCardUI = (color) => {
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

  item.addEventListener('click', () => {
    console.log('click', item);
  });

  return item;
};

const resetUI = () => {
  let cardWrapper = document.querySelector('.card__wrapper');
  let child = cardWrapper.lastElementChild;
  while (child) {
    cardWrapper.removeChild(child);
    child = cardWrapper.lastElementChild;
  }
};

const handleColorUpdate = () => {
  let cardWrapper = document.querySelector('.card__wrapper');

  resetUI();

  const colorArray = [];
  for (let i = 0; i < 3; i++) {
    let newColor = generateColor();
    let x = colorPaletteCardUI(newColor);
    colorArray.push(newColor);
    cardWrapper.appendChild(x);
  }
};

button.addEventListener('click', handleColorUpdate);
