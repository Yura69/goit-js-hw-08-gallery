"use strict";

const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const galleryImagesGef = document.querySelector(".js-gallery");

const createImgListItem = (arr, index) => {
  const listItemRef = document.createElement("li");
  listItemRef.classList.add("gallery__item");
  const listItemLinkRef = document.createElement("a");
  listItemLinkRef.classList.add("gallery__link");
  listItemLinkRef.href = arr.original;
  const listItemLinkImgRef = document.createElement("img");
  listItemLinkImgRef.classList.add("gallery__image");
  listItemLinkImgRef.src = arr.preview;
  listItemLinkImgRef.alt = arr.description;
  listItemLinkImgRef.dataset.source = arr.original;
  listItemLinkImgRef.dataset.index = index;
  listItemRef.appendChild(listItemLinkRef);
  listItemLinkRef.appendChild(listItemLinkImgRef);
  return listItemRef;
};

const imgListArray = images.map((item, index) =>
  createImgListItem(item, index)
);
galleryImagesGef.append(...imgListArray);

const modalWindowRef = document.querySelector(".js-lightbox");
const closeModalBtnRef = document.querySelector("[data-action=close-lightbox]");

const modalImageRef = document.querySelector(".lightbox__image");

galleryImagesGef.addEventListener("click", () => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  modalWindowRef.classList.add("is-open");
  const currentImgClick = event.target.dataset.source;
  const currentImgIndex = event.target.dataset.index;
  modalImageRef.src = currentImgClick;
  modalImageRef.dataset.index = currentImgIndex;
  window.addEventListener("keydown", escClickHandler);
  window.addEventListener("keydown", rightLeftClickHandler);
});

closeModalBtnRef.addEventListener("click", () => {
  onModalClose();
});

const lightBoxOverlay = document.querySelector(".lightbox__overlay");

lightBoxOverlay.addEventListener("click", () => {
  onModalClose();
});

const escClickHandler = (event) => {
  if (event.code === "Escape") {
    onModalClose();
  }
};

function onModalClose() {
  modalWindowRef.classList.remove("is-open");
  modalImageRef.src = "";
  window.removeEventListener("click", escClickHandler);
  window.removeEventListener("click", rightLeftClickHandler);
}
// обработчик события на клавиши вправо\лево
const rightLeftClickHandler = (event) => {
  if (event.code === "ArrowRight") {
    pressRight();
  } else if (event.code === "ArrowLeft") {
    pressLeft();
  }
};
// функция-обработчик события нажатия клавиши вправо
function pressRight() {
  const index = Number(modalImageRef.dataset.index);
  if (index < images.length - 1) {
    const operation = index + 1;
    indexCounter(operation);
  } else {
    indexCounter(0);
    console.log(" Вы достигли конца галереи");
  }
}
// функция-обработчик события нажатия клавиши влево
function pressLeft() {
  const index = Number(modalImageRef.dataset.index);
  if (index > 0) {
    const operation = index - 1;
    indexCounter(operation);
  } else {
    indexCounter(images.length - 1);
    console.log(" Вы вернулись в начало галереи");
  }
}
// обработчик увеличения\уменьшения индекса на 1
function indexCounter(index) {
  modalImageRef.src = images[index].original;
  modalImageRef.alt = images[index].description;
  modalImageRef.dataset.index = `${index}`;
}
