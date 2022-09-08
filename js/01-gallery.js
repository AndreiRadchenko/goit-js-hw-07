import { galleryItems } from './gallery-items.js';

const galleryRef = document.querySelector('.gallery');

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

const basicLightboxInstance = {
  instance: null,
  create(imgSource) {
    this.instance = basicLightbox.create(
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
    this.instance.show();
  },
  destroy() {
    this.instance?.close();
  },
};

function onGalleryClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  basicLightboxInstance.create(event.target.dataset.source);
}

function onEscapeKeyDown(event) {
  if (event.code !== 'Escape') {
    return;
  }
  basicLightboxInstance.destroy();
}
