// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
var nav = document.querySelector('.primary-nav');
var navToggle = document.querySelector('.nav-toggle');
var cartToggle = document.querySelector('.btn--cart');
var cart = document.querySelector('.cart');
var cartContent = document.querySelector('.cart__content');
var addToCartBtn = document.querySelector('.btn--add-to-cart');
var imgs = document.querySelectorAll('.preview-imgs__img');
var lightboxImgs = document.querySelectorAll('.lightbox__imgs__img');
var dim = document.querySelector('.dim');
var lightbox = document.querySelector('.lightbox');
var closeBtn = document.querySelector('.btn--close');
var prevBtnLightbox = document.querySelector('.btn--prev--lightbox');
var nextBtnLightbox = document.querySelector('.btn--next--lightbox');
var previewImgBtnsList = document.querySelector('.img-btns');
var previewImgBtns = document.querySelectorAll('[role="button"]');
var lightboxImgBtnsList = document.querySelector('.lightbox__img-btns');
var lightboxImgBtns = document.querySelectorAll('[role="button-lightbox"]');
var btnMinus = document.querySelector('.btn--minus');
var btnPlus = document.querySelector('.btn--plus');
var qtyEl = document.querySelector('.qty');
var price = document.querySelector('.price-num');
var priceCrossed = document.querySelector('.price-crossed');
navToggle.addEventListener('click', function () {
  navToggle.setAttribute('aria-expanded', !nav.hasAttribute('data-visible'));
  nav.toggleAttribute('data-visible');
  dim.toggleAttribute('data-visible');
});
cartToggle.addEventListener('click', function () {
  cartToggle.setAttribute('aria-expanded', !cart.hasAttribute('data-visible'));
  cart.toggleAttribute('data-visible');
});
addToCartBtn.addEventListener('click', function () {
  var pill = cartToggle.children[1];
  pill.setAttribute('data-visible', true);
  pill.innerText = qtyCount;
  cartContent.innerHTML = "<div class=\"cart__content__info flex\">\n                        <img class=\"cart__content__img\" src=\"image-product-1-thumbnail.33e4c89c.jpg\"\n                            alt=\"white sneakers\">\n                        <div class=\"cart__content__details flex\">\n                            <p class=\"text-primary-700 fs-400 cart__content__title\">Fall Limited Edition Sneakers</p>\n                            <div class=\"cart__content__price fs-400 text-primary-700\">$<span\n                                    class=\"cart-price\">125.00</span>\n                                x ".concat(qtyCount, "\n                                <strong>$<span class=\"cart-price--sum\">").concat(125 * qtyCount, ".00</span></strong>\n                            </div>\n                        </div>\n                        <i class=\"fa-solid fa-trash-can btn--delete\"></i>\n                    </div>\n                    <button class=\"btn btn--checkout text-white fw-700\">Checkout</button>");
  var btnDelete = document.querySelector('.btn--delete');

  if (btnDelete) {
    btnDelete.addEventListener('click', function () {
      pill.setAttribute('data-visible', false);
      cartContent.innerHTML = "<p class=\"cart__content__p fs-400 text-primary-700 fw-700\">Your cart is empty.</p>";
    });
  }
});
var qtyCount = 1;
btnMinus.addEventListener('click', function () {
  decrementQty();
  decrementPrice();
});
btnPlus.addEventListener('click', function () {
  incrementQty();
  incrementPrice();
});

var incrementQty = function incrementQty() {
  qtyCount >= 0 ? qtyCount++ : qtyCount;
  qtyEl.innerText = qtyCount;
};

var decrementQty = function decrementQty() {
  qtyCount >= 2 ? qtyCount-- : qtyCount;
  qtyEl.innerText = qtyCount;
};

var incrementPrice = function incrementPrice() {
  var priceNum = +price.innerText;
  var priceNumCrossed = +priceCrossed.innerText;

  if (priceNum >= 125) {
    price.innerText = "".concat(priceNum + 125, ".00");
    priceCrossed.innerText = "".concat(priceNumCrossed + 250, ".00");
  }
};

var decrementPrice = function decrementPrice() {
  var priceNum = +price.innerText;
  var priceNumCrossed = +priceCrossed.innerText;

  if (priceNum > 125) {
    price.innerText = "".concat(priceNum - 125, ".00");
    priceCrossed.innerText = "".concat(priceNumCrossed - 250, ".00");
  }
};

previewImgBtns.forEach(function (btn) {
  btn.addEventListener('click', changeImg);
});
lightboxImgBtns.forEach(function (btn) {
  btn.addEventListener('click', changeImg);
});

function changeImg(e) {
  var targetImgBtn = e.target;
  var targetImg = targetImgBtn.getAttribute('data-img');

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
  document.querySelectorAll(content).forEach(function (item) {
    item.setAttribute('data-visible', false);
  });
}

function showContent(target) {
  document.getElementById(target).setAttribute('data-visible', true);
}

imgs.forEach(function (img) {
  img.addEventListener('click', function () {
    lightbox.showModal();
  });
});
closeBtn.addEventListener('click', function () {
  lightbox.close();
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51420" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map