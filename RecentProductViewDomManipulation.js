// Select parent div & id 
var mainContentElement = document.getElementById('MainContent');
var indexOfRecentSlider = 0;
var recentlyViewedSection = document.createElement('div');
recentlyViewedSection.id = 'customRecentlyViewedSection';
recentlyViewedSection.classList.add('shopify-section');
recentlyViewedSection.classList.add('index-section');

var parentPageWidthDiv = document.createElement('div');
recentlyViewedSection.appendChild(parentPageWidthDiv);

var pageWidthDiv = document.createElement('div');
pageWidthDiv.classList.add('page-width');
parentPageWidthDiv.appendChild(pageWidthDiv);

var titleDiv = document.createElement('div');
titleDiv.classList.add('title-custom');
titleDiv.innerText = 'Recently Viewed'


var sliderDiv = document.createElement('div');
sliderDiv.classList.add('text-right___custom');

var svgButtonRight = `<svg id="icon-circle-right" height="20" width="20" viewBox="0 0 32 32">
<path
  d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z">
</path>
<path d="M11.086 22.086l2.829 2.829 8.914-8.914-8.914-8.914-2.828 2.828 6.086 6.086z"></path>
</svg>`;
var svgButtonLeft = `<svg id="icon-circle-left" height="20" width="20" viewBox="0 0 32 32">
<path
  d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13z">
</path>
<path d="M20.914 9.914l-2.829-2.829-8.914 8.914 8.914 8.914 2.828-2.828-6.086-6.086z"></path>
</svg>`;
var leftButton = document.createElement('span');
leftButton.innerHTML = svgButtonLeft;
leftButton.classList.add('btn-slider-custom');
leftButton.classList.add('disabled');
leftButton.addEventListener('click', function () {
  indexOfRecentSlider--;
  if (indexOfRecentSlider + 4 > products.length) { indexOfRecentSlider = products.length - 4; }
  if (indexOfRecentSlider <= 0) {
    indexOfRecentSlider = 0;
    leftButton.classList.add('disabled')
  } else {
    leftButton.classList.remove('disabled')
  }
  rightButton.classList.remove('disabled')
  onRecentSlide(indexOfRecentSlider);
});

var rightButton = document.createElement('span');
rightButton.innerHTML = svgButtonRight;
rightButton.classList.add('btn-slider-custom');
rightButton.style.marginLeft = '0.5rem';
rightButton.addEventListener('click', function () {
  indexOfRecentSlider++;
  if (indexOfRecentSlider + 4 >= products.length) {
    indexOfRecentSlider = products.length - 4;
    rightButton.classList.add('disabled');
  } else {
    rightButton.classList.remove('disabled');
  }
  leftButton.classList.remove('disabled');
  if (indexOfRecentSlider < 0) { indexOfRecentSlider = 0; }
  onRecentSlide(indexOfRecentSlider);
});

sliderDiv.appendChild(leftButton);
sliderDiv.appendChild(rightButton);

var parentGridDiv = document.createElement('div');
parentGridDiv.classList.add('slider-container___custom');
var gridDiv = document.createElement('div');
gridDiv.classList.add('slider-custom');
parentGridDiv.appendChild(gridDiv);

function createItem(product, index) {
  var itemDiv = document.createElement('div');
  itemDiv.classList.add('slider-item___custom');
  itemDiv.classList.add(`slider-item___custom-${index}`);

  var productContent = document.createElement('div');
  productContent.classList.add('grid-product__content');
  itemDiv.appendChild(productContent);

  var productLink = document.createElement('a');
  productLink.classList.add('grid-product__link');
  // Product Link 
  productLink.href = product.url;
  productContent.appendChild(productLink);

  var productImage = document.createElement('img');
  productImage.src = product.featuredImage.replace('{width}', '1080');
  productLink.appendChild(productImage);

  var productMeta = document.createElement('div');
  productMeta.classList.add('grid-product__meta');
  productContent.appendChild(productMeta);

  var productTitle = document.createElement('div');
  productTitle.classList.add('grid-product__title');
  productTitle.classList.add('grid-product__title--body');
  productTitle.innerText = product.name.replace(/-/g, ' ');
  productMeta.appendChild(productTitle);

  return itemDiv;
}

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

// Object to array conversion //
var products = [];
if (window.theme.recentlyViewed && window.theme.recentlyViewed.recent && !isEmpty(window.theme.recentlyViewed.recent)) {
  parentGridDiv.removeChild(gridDiv);
  gridDiv.innerHTML = '';
  for (var product in window.theme.recentlyViewed.recent) {
    window.theme.recentlyViewed.recent[product].name = product;
    products.push(window.theme.recentlyViewed.recent[product]);
  }
}
for (var i = 0; i < products.length; i++) {
  gridDiv.appendChild(createItem(products[i], i));
}
parentGridDiv.appendChild(gridDiv);

pageWidthDiv.appendChild(titleDiv);
if (products.length > 4) {
  pageWidthDiv.appendChild(sliderDiv);
}
pageWidthDiv.appendChild(parentGridDiv);
function onRecentSlide(index) {
  gridDiv.style.right = `${index * 100}%`;
  if (window.matchMedia("(min-width: 800px)").matches) { gridDiv.style.right = `${index * 50}%`; }
  if (window.matchMedia("(min-width: 1200px)").matches) { gridDiv.style.right = `${index * 25}%`; }
}

onRecentSlide(0);
if (window.theme.recentlyViewed && window.theme.recentlyViewed.recent && !isEmpty(window.theme.recentlyViewed.recent)) {
  mainContentElement.appendChild(recentlyViewedSection);
}

// Adding Stylesheet
var cssAnimation = document.createElement('style');
cssAnimation.type = 'text/css';
var cssStyles = `
.title-custom {
  text-align: center;
  font-weight: bold;
  font-size: 1.5em;
  text-transform: uppercase;
}
.text-right___custom {
  text-align: right;
  margin-right: 1rem;
}
.btn-slider-custom {
  cursor: pointer;
  filter: invert(40%);
}
.btn-slider-custom:hover {
  cursor: pointer;
  filter: invert(0%);
}
.btn-slider-custom.disabled {
  pointer-events: none;
}
.slider-container___custom {
  position: relative;
  overflow: hidden;
  transition: 0.6s left ease-in-out;
}
.slider-custom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  transition: 0.5s right ease-in-out;
  position: relative;
}
.slider-item___custom {
  / transition: all 0.5s ease 0s; /
  flex: 1 0 100%;
  padding: 1rem;
}
@media screen and (min-width: 800px) {
  .slider-item___custom {
    flex: 1 0 50%;
  }
}
@media screen and (min-width: 1200px) {
  .slider-item___custom {
    flex: 1 0 25%;
  }
}
`
var rules = document.createTextNode(cssStyles);

cssAnimation.appendChild(rules);
document.getElementsByTagName("head")[0].appendChild(cssAnimation);
