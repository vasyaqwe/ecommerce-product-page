const prevBtnMobile = document.querySelector('.btn--prev--preview');
const nextBtnMobile = document.querySelector('.btn--next--preview');
const prevBtnLightbox = document.querySelector('.btn--prev--lightbox');
const nextBtnLightbox = document.querySelector('.btn--next--lightbox');
const previewImgs = document.querySelectorAll('.preview-imgs__img');
const lightboxImgs = document.querySelectorAll('.lightbox__imgs__img');
const imgBtnsListLightbox = document.querySelector('.lightbox__img-btns');
const imgBtnsLightbox = document.querySelectorAll('[role="button-lightbox"]');

let activeImg = 0;

prevBtnMobile.addEventListener('click', () => {
    activeImg--;
    if (activeImg < 0) {
        activeImg = previewImgs.length - 1;
    }

    setActiveImg(previewImgs);
    setActiveImg(lightboxImgs);
    setActiveState(imgBtnsListLightbox, imgBtnsLightbox);
});
nextBtnMobile.addEventListener('click', () => {
    activeImg++;
    if (activeImg > previewImgs.length - 1) {
        activeImg = 0;
    }
    setActiveImg(previewImgs);
    setActiveImg(lightboxImgs);
    setActiveState(imgBtnsListLightbox, imgBtnsLightbox);
});
prevBtnLightbox.addEventListener('click', () => {
    activeImg--;
    if (activeImg < 0) {
        activeImg = lightboxImgs.length - 1;
    }
    setActiveImg(lightboxImgs);
    setActiveState(imgBtnsListLightbox, imgBtnsLightbox);
})
nextBtnLightbox.addEventListener('click', () => {
    activeImg++;
    if (activeImg > lightboxImgs.length - 1) {
        activeImg = 0;
    }
    setActiveImg(lightboxImgs);
    setActiveState(imgBtnsListLightbox, imgBtnsLightbox);
})

function setActiveImg(imgs) {
    imgs.forEach(img => img.setAttribute('data-visible', false));
    imgs[activeImg].setAttribute('data-visible', true);
}

function setActiveState(btnsList, btns) {
    btnsList.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false);
    btns[activeImg].setAttribute('aria-selected', true);
}