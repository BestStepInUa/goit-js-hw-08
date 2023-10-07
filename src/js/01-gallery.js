import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const gallaryList = document.querySelector('.gallery');
const gallaryMarkup = createGallaryItemsMarkup(galleryItems);
// Adding generated markup
gallaryList.insertAdjacentHTML('beforeend', gallaryMarkup);

// Generate gallary markup function
function createGallaryItemsMarkup(gallary) {
    return gallary.map(({ preview, original, description }) => {
        return `
            <li class='gallery__item'>
                <a class='gallery__link' href='${original}'>
                <img class='gallery__image lazyload' data-src='${preview}' loading='lazy' alt='${description}' />
                </a>
            </li>
            `;
    }).join('');
}

// SimpleLightbox instance init
const galleryLightbox = new SimpleLightbox('.gallery a',
    {
        captionsData: "alt",
        captionDelay: 250,
    }
);
galleryLightbox.on('show.simplelightbox');

// Native lazy loading or using lazysizes lib
if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
        
    });
 
} else {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    script.integrity = 'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'no-referrer';
    document.body.appendChild(script);
}