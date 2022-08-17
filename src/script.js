const nav = document.querySelector('.primary-nav');
const navToggle = document.querySelector('.nav-toggle');
const cartToggle = document.querySelector('.btn--cart');
const cart = document.querySelector('.cart');
const cartContent = document.querySelector('.cart__content');
const addToCartBtn = document.querySelector('.btn--add-to-cart');

const prevBtnMobile = document.querySelector('.btn--prev--preview');
const nextBtnMobile = document.querySelector('.btn--next--preview');
const previewImgs = document.querySelectorAll('.preview-imgs__img');
const lightboxImgs = document.querySelectorAll('.lightbox__imgs__img');
const dim = document.querySelector('.dim');

const imgs = document.querySelectorAll('.preview-imgs__img');
const lightbox = document.querySelector('.lightbox');
const closeBtn = document.querySelector('.btn--close');
const prevBtnLightbox = document.querySelector('.btn--prev--lightbox');
const nextBtnLightbox = document.querySelector('.btn--next--lightbox');


const imgBtnsList = document.querySelector('.img-btns');
const imgBtns = document.querySelectorAll('[role="button"]');
const imgBtnsListLightbox = document.querySelector('.lightbox__img-btns');
const imgBtnsLightbox = document.querySelectorAll('[role="button-lightbox"]');

const btnMinus = document.querySelector('.btn--minus');
const btnPlus = document.querySelector('.btn--plus');
const qtyEl = document.querySelector('.qty');

const price = document.querySelector('.price-num');
const priceCrossed = document.querySelector('.price-crossed');

//nav and cart toggling//
navToggle.addEventListener('click', () => {
    const visibility = nav.getAttribute('data-visible');
    if (visibility === 'false') {
        nav.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
        dim.setAttribute('data-visible', true);
    } else {
        nav.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
        dim.setAttribute('data-visible', false);
    }
})

cartToggle.addEventListener('click', () => {
    const visibility = cart.getAttribute('data-visible');
    if (visibility === 'false') {
        cart.setAttribute('data-visible', true);
        cartToggle.setAttribute('aria-expanded', true);
    } else {
        cart.setAttribute('data-visible', false);
        cartToggle.setAttribute('aria-expanded', false);
    }
})
//nav and cart toggling//

//add and delete cart items//
addToCartBtn.addEventListener('click', () => {
    const pill = cartToggle.children[1];
    pill.setAttribute('data-visible', true);
    pill.innerText = qtyCount;
    cartContent.innerHTML = `<div class="cart__content__info flex">
                        <img class="cart__content__img" src="image-product-1-thumbnail.33e4c89c.jpg"
                            alt="white sneakers">
                        <div class="cart__content__details flex">
                            <p class="text-primary-700 fs-400 cart__content__title">Fall Limited Edition Sneakers</p>
                            <div class="cart__content__price fs-400 text-primary-700">$<span
                                    class="cart-price">125.00</span>
                                x ${qtyCount}
                                <strong>$<span class="cart-price--sum">${125 * qtyCount}.00</span></strong>
                            </div>
                        </div>
                        <i class="fa-solid fa-trash-can btn--delete"></i>
                    </div>
                    <button class="btn btn--checkout text-white fw-700">Checkout</button>`;

    const btnDelete = document.querySelector('.btn--delete');
    if (btnDelete) {
        btnDelete.addEventListener('click', () => {
            pill.setAttribute('data-visible', false);
            cartContent.innerHTML = `<p class="cart__content__p fs-400 text-primary-700 fw-700">Your cart is empty.</p>`;
        })
    }
})
//add and delete cart items//

//increment qty//
let qtyCount = 1;

const incrementQty = () => {
    qtyCount >= 0 ? qtyCount++ : qtyCount;
    qtyEl.innerText = qtyCount;
}
const decrementQty = () => {
    qtyCount >= 2 ? qtyCount-- : qtyCount;
    qtyEl.innerText = qtyCount;
}
btnMinus.addEventListener('click', () => {
    decrementQty();
    decrementPrice();
})
btnPlus.addEventListener('click', () => {
    incrementQty();
    incrementPrice();
})
//increment qty//

//change price//
const incrementPrice = () => {
    let priceNum = +price.innerText;
    let priceNumCrossed = +priceCrossed.innerText;
    if (priceNum >= 125) {
        price.innerText = `${priceNum + 125}.00`;
        priceCrossed.innerText = `${priceNumCrossed + 250}.00`;
    }
}
const decrementPrice = () => {
    let priceNum = +price.innerText;
    let priceNumCrossed = +priceCrossed.innerText;
    if (priceNum > 125) {
        price.innerText = `${priceNum - 125}.00`;
        priceCrossed.innerText = `${priceNumCrossed - 250}.00`;
    }
}
//change price//

//image slider on mobile//
let activeImg = 0;

prevBtnMobile.addEventListener('click', () => {
    activeImg--;
    if (activeImg < 0) {
        activeImg = previewImgs.length - 1;
    }
    setActiveImg(previewImgs);
});
nextBtnMobile.addEventListener('click', () => {
    activeImg++;
    if (activeImg > previewImgs.length - 1) {
        activeImg = 0;
    }
    setActiveImg(previewImgs);
});
prevBtnLightbox.addEventListener('click', () => {
    activeImg--;
    if (activeImg < 0) {
        activeImg = lightboxImgs.length - 1;
    }
    setActiveImg(lightboxImgs);
    imgBtnsListLightbox.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false);
    imgBtnsLightbox[activeImg].setAttribute('aria-selected', true);
})
nextBtnLightbox.addEventListener('click', () => {
    activeImg++;
    if (activeImg > lightboxImgs.length - 1) {
        activeImg = 0;
    }
    setActiveImg(lightboxImgs);
    imgBtnsListLightbox.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false);
    imgBtnsLightbox[activeImg].setAttribute('aria-selected', true);
})

function setActiveImg(imgs) {
    imgs.forEach(img => img.setAttribute('data-visible', false));
    imgs[activeImg].setAttribute('data-visible', true);
}
//image slider on mobile//

//img buttons//
let buttonFocus = 0;

imgBtnsList.addEventListener('keydown', changeBtnFocus);
imgBtnsListLightbox.addEventListener('keydown', changeBtnFocus);

imgBtns.forEach(btn => {
    btn.addEventListener('click', changeImg)
})
imgBtnsLightbox.forEach(btn => {
    btn.addEventListener('click', changeImg)
})

function changeBtnFocus(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        imgBtns[buttonFocus].setAttribute('tabindex', -1);
        imgBtnsLightbox[buttonFocus].setAttribute('tabindex', -1);
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
        imgBtnsLightbox[buttonFocus].setAttribute('tabindex', 0);
        imgBtnsLightbox[buttonFocus].focus();
    }
}

function changeImg(e) {
    const targetImgBtn = e.target;
    const targetImg = targetImgBtn.getAttribute('data-img');

    //if it's not the lightbox images//
    if (targetImg === 'img1' || targetImg === 'img2' || targetImg === 'img3' || targetImg === 'img4') {
        hideContent('.preview-imgs__img');
        imgBtnsList.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false);
        //if it's not the lightbox images//
        //if it's the lightbox images//
    } else {
        imgBtnsListLightbox.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false);
        hideContent('.lightbox__imgs__img');
    }
    //if it's the lightbox images//
    targetImgBtn.setAttribute('aria-selected', true);
    showContent(targetImg);
}
//img buttons//
function hideContent(content) {
    document.querySelectorAll(content).forEach(item => {
        item.setAttribute('data-visible', false);
    })
}
function showContent(target) {
    document.getElementById(target).setAttribute('data-visible', true);
}

imgs.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.showModal()
    })
})
closeBtn.addEventListener('click', () => {
    lightbox.close()
})