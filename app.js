const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
  modalImage: document.querySelector('.lightbox__image'),
  modalButton: document.querySelector('.lightbox__button'),
};

let currentIndex = 0;

const makeGallery = ({ preview, original, description }, index) => {

  const galleryImg = document.createElement('img');
  galleryImg.src = preview;
  galleryImg.dataset.source = original;
  galleryImg.alt = description;
  galleryImg.classList.add('gallery__image');

  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery__link');
  galleryLink.href = galleryImg.dataset.source;
  galleryLink.appendChild(galleryImg);

  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');
  galleryItem.appendChild(galleryLink);
  galleryItem.dataset.index = index;

  return galleryItem;
};

const images = galleryItems.map(makeGallery);
refs.gallery.append(...images);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения

refs.gallery.addEventListener('click', onOpenModal)

// Открытие модального окна по клику на элементе галереи

function onOpenModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  event.preventDefault();

  refs.modal.classList.add('is-open');

  addImageDetails(event);

  // window.addEventListener("keydown", keyHendler)
}

// Подмена значения атрибута src элемента img.lightbox__image
function addImageDetails(event) {

  refs.modalImage.alt = event.target.alt;

  if (refs.modal.classList.contains('is-open')) {
    refs.modalImage.src = event.target.dataset.source;
  } else {
    refs.modalImage.src = '';
  };

  
}

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]

refs.modalButton.addEventListener('click', onCloseModal);

// Закрытие модального окна по клику на div.lightbox__overlay

refs.modalOverlay.addEventListener('click', onCloseModal);

function onCloseModal(event) {
  refs.modal.classList.remove('is-open');
  
  // Очистка значения атрибута src элемента img.lightbox__image

  addImageDetails(event);
}

// Закрытие модального окна по нажатию клавиши ESC

window.addEventListener("keydown", keyHendler)

function keyHendler(event) {
  if (event.code === "Escape") {
    onCloseModal(event);
  } else if (event.code === "ArrowRight") {
    onArrowRight(event);
  } else if (event.code === "ArrowLeft") {
    onArrowLeft(event);
  }
}

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо"

function onArrowRight(event) {
  if (currentIndex + 1 > galleryItems.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex += 1;
  }
  refs.modalImage.src = galleryItems[currentIndex].original;
  refs.modalImage.alt = galleryItems[currentIndex].description;
}

function onArrowLeft(event) {
  if (currentIndex - 1 < 0) {
    currentIndex = galleryItems.length - 1;
  } else {
    currentIndex -= 1;
  }
  refs.modalImage.src = galleryItems[currentIndex].original;
  refs.modalImage.alt = galleryItems[currentIndex].description;
}