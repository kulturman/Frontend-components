/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/fakeBackend.ts":
/*!****************************!*\
  !*** ./src/fakeBackend.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TweetLoader = void 0;
class TweetLoader {
    constructor() {
        this.DEFAULT_PAGE_SIZE = 10;
        this.generateFakeTweets();
    }
    generateFakeTweets() {
        this.tweets = [];
        for (let i = 1; i <= 300; i++) {
            this.tweets.push({
                id: i,
                text: `This is just a fake tweet, Id is ${i}`,
            });
        }
    }
    loadData(request) {
        //Let's fake an async process here
        return new Promise((resolve) => {
            setTimeout(() => {
                const lastId = request.lastId || 0;
                const pageSize = request.pageSize || this.DEFAULT_PAGE_SIZE;
                if (lastId < 0) {
                    resolve([]);
                }
                const firstElementIndex = this.tweets.findIndex((tweet) => tweet.id > lastId);
                const lastElementIndex = firstElementIndex + pageSize < this.tweets.length
                    ? firstElementIndex + pageSize
                    : this.tweets.length - 1;
                return resolve(this.tweets.slice(firstElementIndex, lastElementIndex));
            }, 3000);
        });
    }
}
exports.TweetLoader = TweetLoader;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const fakeBackend_1 = __webpack_require__(/*! ./fakeBackend */ "./src/fakeBackend.ts");
const tweetLoader = new fakeBackend_1.TweetLoader();
const dataToLoad = { lastId: 0, pageSize: 5 };
const tweetsContainerElement = document.querySelector(".tweets");
const loaderElement = document.querySelector(".loader");
function loadData() {
    loaderElement === null || loaderElement === void 0 ? void 0 : loaderElement.classList.remove("loader--invisible");
    tweetLoader.loadData(dataToLoad).then((tweets) => {
        loaderElement === null || loaderElement === void 0 ? void 0 : loaderElement.classList.add("loader--invisible");
        tweets.forEach((tweet) => renderTweet(tweet));
    });
}
function renderTweet(tweet) {
    tweetsContainerElement === null || tweetsContainerElement === void 0 ? void 0 : tweetsContainerElement.insertAdjacentHTML("beforeend", `
    <div class="tweet">
        <div class="tweet__column avatar">
          <img class="avatar__image" src="./assets/motor.png" />
        </div>
        <div class="tweet__column tweet__main">
          <div class="tweet__main__header">
            <div
              class="tweet__main__header__item tweet__main__header__item--name"
            >
              BlahX
            </div>
            <div
              class="tweet__main__header__item tweet__main__header__item--badge"
            >
              <img
                class="tweet__icon tweet__main__header__item__badge"
                src="http://educative.io/udata/nWjylg5XloB/footer_icon.svg"
              />
            </div>
            <div
              class="tweet__main__header__item tweet__main__header__item--handle"
            >
              @blahx
            </div>
            <div
              class="tweet__main__header__item tweet__main__header__item--duration"
            >
              7h
            </div>
          </div>
          <div class="tweet__main__message">
            ${tweet.text}
          </div>
          <div class="tweet__footer">
            <div class="tweet__footer__stats">
              <img
                class="tweet__icon tweet__footer__stats__item"
                src="http://educative.io/udata/nWjylg5XloB/footer_icon.svg"
              />
              <div class="tweet__footer__stats__item">10</div>
            </div>
            <div class="tweet__footer__stats">
              <img
                class="tweet__icon tweet__footer__stats__item"
                src="http://educative.io/udata/nWjylg5XloB/footer_icon.svg"
              />
              <div class="tweet__footer__stats__item">900</div>
            </div>
            <div class="tweet__footer__stats">
              <img
                class="tweet__icon tweet__footer__stats__item"
                src="http://educative.io/udata/nWjylg5XloB/footer_icon.svg"
              />
              <div class="tweet__footer__stats__item">1.1K</div>
            </div>
            <div class="tweet__footer__stats">
              <img
                class="tweet__icon tweet__footer__stats__item"
                src="http://educative.io/udata/nWjylg5XloB/footer_icon.svg"
              />
            </div>
          </div>
        </div>
        <div class="tweet__menu">
          <img
            class="tweet__icon tweet__menu__icon"
            src="./assets/down_icon.svg"
          />
        </div>
      </div>`);
}
loadData();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNoRCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxLQUFZO0lBQy9CLHNCQUFzQixhQUF0QixzQkFBc0IsdUJBQXRCLHNCQUFzQixDQUFFLGtCQUFrQixDQUN4QyxXQUFXLEVBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2NBZ0NVLEtBQUssQ0FBQyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzthQXNDWCxDQUNWLENBQUM7QUFDSixDQUFDO0FBRUQsUUFBUSxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdXRvLXZhbGlkYXRpbmctZm9ybS8uL3NyYy9mYWtlQmFja2VuZC50cyIsIndlYnBhY2s6Ly9hdXRvLXZhbGlkYXRpbmctZm9ybS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hdXRvLXZhbGlkYXRpbmctZm9ybS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIExvYWREYXRhUmVxdWVzdCB7XG4gIGxhc3RJZD86IG51bWJlcjtcbiAgcGFnZVNpemU/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHdlZXQge1xuICBpZDogbnVtYmVyO1xuICB0ZXh0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBUd2VldExvYWRlciB7XG4gIHByaXZhdGUgdHdlZXRzITogVHdlZXRbXTtcbiAgcHJpdmF0ZSBERUZBVUxUX1BBR0VfU0laRSA9IDEwO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZ2VuZXJhdGVGYWtlVHdlZXRzKCk7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlRmFrZVR3ZWV0cygpOiB2b2lkIHtcbiAgICB0aGlzLnR3ZWV0cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzAwOyBpKyspIHtcbiAgICAgIHRoaXMudHdlZXRzLnB1c2goe1xuICAgICAgICBpZDogaSxcbiAgICAgICAgdGV4dDogYFRoaXMgaXMganVzdCBhIGZha2UgdHdlZXQsIElkIGlzICR7aX1gLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGxvYWREYXRhKHJlcXVlc3Q6IExvYWREYXRhUmVxdWVzdCk6IFByb21pc2U8VHdlZXRbXT4ge1xuICAgIC8vTGV0J3MgZmFrZSBhbiBhc3luYyBwcm9jZXNzIGhlcmVcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VHdlZXRbXT4oKHJlc29sdmUpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBsYXN0SWQgPSByZXF1ZXN0Lmxhc3RJZCB8fCAwO1xuICAgICAgICBjb25zdCBwYWdlU2l6ZSA9IHJlcXVlc3QucGFnZVNpemUgfHwgdGhpcy5ERUZBVUxUX1BBR0VfU0laRTtcblxuICAgICAgICBpZiAobGFzdElkIDwgMCkge1xuICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlyc3RFbGVtZW50SW5kZXggPSB0aGlzLnR3ZWV0cy5maW5kSW5kZXgoXG4gICAgICAgICAgKHR3ZWV0KSA9PiB0d2VldC5pZCA+IGxhc3RJZFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBsYXN0RWxlbWVudEluZGV4ID1cbiAgICAgICAgICBmaXJzdEVsZW1lbnRJbmRleCArIHBhZ2VTaXplIDwgdGhpcy50d2VldHMubGVuZ3RoXG4gICAgICAgICAgICA/IGZpcnN0RWxlbWVudEluZGV4ICsgcGFnZVNpemVcbiAgICAgICAgICAgIDogdGhpcy50d2VldHMubGVuZ3RoIC0gMTtcblxuICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLnR3ZWV0cy5zbGljZShmaXJzdEVsZW1lbnRJbmRleCwgbGFzdEVsZW1lbnRJbmRleCkpO1xuICAgICAgfSwgMzAwMCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBMb2FkRGF0YVJlcXVlc3QsIFR3ZWV0LCBUd2VldExvYWRlciB9IGZyb20gXCIuL2Zha2VCYWNrZW5kXCI7XG5cbmNvbnN0IHR3ZWV0TG9hZGVyID0gbmV3IFR3ZWV0TG9hZGVyKCk7XG5jb25zdCBkYXRhVG9Mb2FkOiBMb2FkRGF0YVJlcXVlc3QgPSB7IGxhc3RJZDogMCwgcGFnZVNpemU6IDUgfTtcbmNvbnN0IHR3ZWV0c0NvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICBcIi50d2VldHNcIlxuKSBhcyBIVE1MRGl2RWxlbWVudDtcbmNvbnN0IGxvYWRlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvYWRlclwiKTtcblxuZnVuY3Rpb24gbG9hZERhdGEoKSB7XG4gIGxvYWRlckVsZW1lbnQ/LmNsYXNzTGlzdC5yZW1vdmUoXCJsb2FkZXItLWludmlzaWJsZVwiKTtcblxuICB0d2VldExvYWRlci5sb2FkRGF0YShkYXRhVG9Mb2FkKS50aGVuKCh0d2VldHMpID0+IHtcbiAgICBsb2FkZXJFbGVtZW50Py5jbGFzc0xpc3QuYWRkKFwibG9hZGVyLS1pbnZpc2libGVcIik7XG4gICAgdHdlZXRzLmZvckVhY2goKHR3ZWV0KSA9PiByZW5kZXJUd2VldCh0d2VldCkpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyVHdlZXQodHdlZXQ6IFR3ZWV0KSB7XG4gIHR3ZWV0c0NvbnRhaW5lckVsZW1lbnQ/Lmluc2VydEFkamFjZW50SFRNTChcbiAgICBcImJlZm9yZWVuZFwiLFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPVwidHdlZXRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInR3ZWV0X19jb2x1bW4gYXZhdGFyXCI+XG4gICAgICAgICAgPGltZyBjbGFzcz1cImF2YXRhcl9faW1hZ2VcIiBzcmM9XCIuL2Fzc2V0cy9tb3Rvci5wbmdcIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInR3ZWV0X19jb2x1bW4gdHdlZXRfX21haW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdlZXRfX21haW5fX2hlYWRlclwiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cInR3ZWV0X19tYWluX19oZWFkZXJfX2l0ZW0gdHdlZXRfX21haW5fX2hlYWRlcl9faXRlbS0tbmFtZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIEJsYWhYXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3M9XCJ0d2VldF9fbWFpbl9faGVhZGVyX19pdGVtIHR3ZWV0X19tYWluX19oZWFkZXJfX2l0ZW0tLWJhZGdlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIGNsYXNzPVwidHdlZXRfX2ljb24gdHdlZXRfX21haW5fX2hlYWRlcl9faXRlbV9fYmFkZ2VcIlxuICAgICAgICAgICAgICAgIHNyYz1cImh0dHA6Ly9lZHVjYXRpdmUuaW8vdWRhdGEvbldqeWxnNVhsb0IvZm9vdGVyX2ljb24uc3ZnXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cInR3ZWV0X19tYWluX19oZWFkZXJfX2l0ZW0gdHdlZXRfX21haW5fX2hlYWRlcl9faXRlbS0taGFuZGxlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgQGJsYWh4XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3M9XCJ0d2VldF9fbWFpbl9faGVhZGVyX19pdGVtIHR3ZWV0X19tYWluX19oZWFkZXJfX2l0ZW0tLWR1cmF0aW9uXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgN2hcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VldF9fbWFpbl9fbWVzc2FnZVwiPlxuICAgICAgICAgICAgJHt0d2VldC50ZXh0fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VldF9fZm9vdGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdlZXRfX2Zvb3Rlcl9fc3RhdHNcIj5cbiAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIGNsYXNzPVwidHdlZXRfX2ljb24gdHdlZXRfX2Zvb3Rlcl9fc3RhdHNfX2l0ZW1cIlxuICAgICAgICAgICAgICAgIHNyYz1cImh0dHA6Ly9lZHVjYXRpdmUuaW8vdWRhdGEvbldqeWxnNVhsb0IvZm9vdGVyX2ljb24uc3ZnXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3ZWV0X19mb290ZXJfX3N0YXRzX19pdGVtXCI+MTA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3ZWV0X19mb290ZXJfX3N0YXRzXCI+XG4gICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICBjbGFzcz1cInR3ZWV0X19pY29uIHR3ZWV0X19mb290ZXJfX3N0YXRzX19pdGVtXCJcbiAgICAgICAgICAgICAgICBzcmM9XCJodHRwOi8vZWR1Y2F0aXZlLmlvL3VkYXRhL25XanlsZzVYbG9CL2Zvb3Rlcl9pY29uLnN2Z1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VldF9fZm9vdGVyX19zdGF0c19faXRlbVwiPjkwMDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdlZXRfX2Zvb3Rlcl9fc3RhdHNcIj5cbiAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIGNsYXNzPVwidHdlZXRfX2ljb24gdHdlZXRfX2Zvb3Rlcl9fc3RhdHNfX2l0ZW1cIlxuICAgICAgICAgICAgICAgIHNyYz1cImh0dHA6Ly9lZHVjYXRpdmUuaW8vdWRhdGEvbldqeWxnNVhsb0IvZm9vdGVyX2ljb24uc3ZnXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3ZWV0X19mb290ZXJfX3N0YXRzX19pdGVtXCI+MS4xSzwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdlZXRfX2Zvb3Rlcl9fc3RhdHNcIj5cbiAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIGNsYXNzPVwidHdlZXRfX2ljb24gdHdlZXRfX2Zvb3Rlcl9fc3RhdHNfX2l0ZW1cIlxuICAgICAgICAgICAgICAgIHNyYz1cImh0dHA6Ly9lZHVjYXRpdmUuaW8vdWRhdGEvbldqeWxnNVhsb0IvZm9vdGVyX2ljb24uc3ZnXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInR3ZWV0X19tZW51XCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgY2xhc3M9XCJ0d2VldF9faWNvbiB0d2VldF9fbWVudV9faWNvblwiXG4gICAgICAgICAgICBzcmM9XCIuL2Fzc2V0cy9kb3duX2ljb24uc3ZnXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmBcbiAgKTtcbn1cblxubG9hZERhdGEoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==