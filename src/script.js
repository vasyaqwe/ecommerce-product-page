const nav = document.querySelector('.primary-nav');
const navToggle = document.querySelector('.nav-toggle');
const cartToggle = document.querySelector('.btn--cart');
const cart = document.querySelector('.cart');
const cartContent = document.querySelector('.cart__content');
const addToCartBtn = document.querySelector('.btn--add-to-cart');

const imgs = document.querySelectorAll('.preview-imgs__img');
const lightboxImgs = document.querySelectorAll('.lightbox__imgs__img');
const dim = document.querySelector('.dim');

const lightbox = document.querySelector('.lightbox');
const closeBtn = document.querySelector('.btn--close');
const prevBtnLightbox = document.querySelector('.btn--prev--lightbox');
const nextBtnLightbox = document.querySelector('.btn--next--lightbox');


const previewImgBtnsList = document.querySelector('.img-btns');
const previewImgBtns = document.querySelectorAll('[role="button"]');
const lightboxImgBtnsList = document.querySelector('.lightbox__img-btns');
const lightboxImgBtns = document.querySelectorAll('[role="button-lightbox"]');

const btnMinus = document.querySelector('.btn--minus');
const btnPlus = document.querySelector('.btn--plus');
const qtyEl = document.querySelector('.qty');

const price = document.querySelector('.price-num');
const priceCrossed = document.querySelector('.price-crossed');

navToggle.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', !nav.hasAttribute('data-visible'));
    nav.toggleAttribute('data-visible');
    dim.toggleAttribute('data-visible');
})

cartToggle.addEventListener('click', () => {
    cartToggle.setAttribute('aria-expanded', !cart.hasAttribute('data-visible'));
    cart.toggleAttribute('data-visible');
})

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

let qtyCount = 1;
btnMinus.addEventListener('click', () => {
    decrementQty();
    decrementPrice();
})
btnPlus.addEventListener('click', () => {
    incrementQty();
    incrementPrice();
})

const incrementQty = () => {
    qtyCount >= 0 ? qtyCount++ : qtyCount;
    qtyEl.innerText = qtyCount;
}
const decrementQty = () => {
    qtyCount >= 2 ? qtyCount-- : qtyCount;
    qtyEl.innerText = qtyCount;
}

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

previewImgBtns.forEach(btn => {
    btn.addEventListener('click', changeImg)
})
lightboxImgBtns.forEach(btn => {
    btn.addEventListener('click', changeImg)
})

function changeImg(e) {
    const targetImgBtn = e.target;
    const targetImg = targetImgBtn.getAttribute('data-img');

    if (document.getElementById(targetImg).dataset.img === 'preview') {
        previewImgBtnsList.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false);
        hideContent('.preview-imgs__img');
    } else {
        lightboxImgBtnsList.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false);
        hideContent('.lightbox__imgs__img');
    }

    targetImgBtn.setAttribute('aria-selected', true);
    showContent(targetImg);
}

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