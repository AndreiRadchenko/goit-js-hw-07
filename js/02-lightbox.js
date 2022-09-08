import { galleryItems } from './gallery-items.js';

const galleryRef = document.querySelector('.gallery');

function createGalleryMarkup(galleryItemsArray) {
  return galleryItemsArray
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" />
              </a>`;
    })
    .join('');
}

galleryRef.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionClass: 'custom-caption',
});
