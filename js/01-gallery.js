import { galleryItems } from './gallery-items.js';

const galleryRef = document.querySelector('.gallery');

let basicLightboxInstance;

function createGalleryMarkup(galleryItemsArray) {
  return galleryItemsArray
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
                <a class="gallery__link" href=${original} 
                    target="_blank" rel="noreferrer noopener">
                  <img
                    class="gallery__image"
                    src=${preview}
                    data-source=${original}
                    alt=${description}
                  />
                </a>
              </div>`;
    })
    .join('');
}

galleryRef.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

galleryRef.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  basicLightboxInstance = createBasicLightbox(event.target.dataset.source);
  basicLightboxInstance.show();
}

function createBasicLightbox(imgSource) {
  return basicLightbox.create(
    `
    <img src="${imgSource}" width="800" height="600">
`,
    {
      onShow: instance => {
        document.addEventListener('keydown', onEscapeKeyDown);
      },
      onClose: instance => {
        document.removeEventListener('keydown', onEscapeKeyDown);
      },
    },
  );
}

function onEscapeKeyDown(event) {
  if (event.code !== 'Escape') {
    return;
  }
  basicLightboxInstance.close();
}
