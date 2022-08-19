const imgBtnsList = document.querySelector('.img-btns');
const imgBtns = document.querySelectorAll('[role="button"]');
const lightboxImgBtnsList = document.querySelector('.lightbox__img-btns');
const lightboxImgBtns = document.querySelectorAll('[role="button-lightbox"]');

let buttonFocus = 0;

imgBtnsList.addEventListener('keydown', changeBtnFocus);
lightboxImgBtnsList.addEventListener('keydown', changeBtnFocus);

function changeBtnFocus(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        imgBtns[buttonFocus].setAttribute('tabindex', -1);
        lightboxImgBtns[buttonFocus].setAttribute('tabindex', -1);
        if (e.key === 'ArrowLeft') {
            buttonFocus--;
            if (buttonFocus < 0) {
                buttonFocus = imgBtns.length - 1;
            }
        } else if (e.key === 'ArrowRight') {
            buttonFocus++;
            if (buttonFocus >= imgBtns.length) {
                buttonFocus = 0;
            }
        }
        imgBtns[buttonFocus].setAttribute('tabindex', 0);
        imgBtns[buttonFocus].focus();
        lightboxImgBtns[buttonFocus].setAttribute('tabindex', 0);
        lightboxImgBtns[buttonFocus].focus();
    }
}