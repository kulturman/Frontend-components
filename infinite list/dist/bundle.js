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
        for (let i = 1; i <= 100; i++) {
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
                    resolve({
                        tweets: [],
                        lastId: 0
                    });
                }
                const firstElementIndex = this.tweets.findIndex((tweet) => tweet.id > lastId);
                const lastElementIndex = firstElementIndex + pageSize < this.tweets.length
                    ? firstElementIndex + pageSize
                    : this.tweets.length - 1;
                return resolve({
                    tweets: this.tweets.slice(firstElementIndex, lastElementIndex),
                    lastId: this.tweets[lastElementIndex].id
                });
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
const dataToLoad = { lastId: 0, pageSize: 15 };
const tweetsContainerElement = document.querySelector(".tweets");
const loaderElement = document.querySelector(".loader");
let isDataLoading = false;
function loadData() {
    loaderElement === null || loaderElement === void 0 ? void 0 : loaderElement.classList.remove("loader--invisible");
    isDataLoading = true;
    tweetLoader.loadData(dataToLoad).then((loadedData) => {
        loaderElement === null || loaderElement === void 0 ? void 0 : loaderElement.classList.add("loader--invisible");
        isDataLoading = false;
        dataToLoad.lastId = loadedData.lastId;
        loadedData.tweets.forEach((tweet) => renderTweet(tweet));
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
document.addEventListener("scroll", (event) => {
    const scrolledTo = window.innerHeight + window.scrollY;
    const scrollLimit = document.body.offsetHeight;
    const scrollThreshold = 30;
    if (scrollLimit - scrolledTo <= scrollThreshold && !isDataLoading) {
        loadData();
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQ25ELGFBQWEsYUFBYixhQUFhLHVCQUFiLGFBQWEsQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbEQsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixVQUFVLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDdEMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLEtBQVk7SUFDL0Isc0JBQXNCLGFBQXRCLHNCQUFzQix1QkFBdEIsc0JBQXNCLENBQUUsa0JBQWtCLENBQ3hDLFdBQVcsRUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Y0FnQ1UsS0FBSyxDQUFDLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBc0NYLENBQ1YsQ0FBQztBQUNKLENBQUM7QUFFRCxRQUFRLEVBQUUsQ0FBQztBQUVYLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUM1QyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDdkQsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDL0MsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBRTNCLElBQUksV0FBVyxHQUFHLFVBQVUsSUFBSSxlQUFlLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDakUsUUFBUSxFQUFFLENBQUM7S0FDWjtBQUNILENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXV0by12YWxpZGF0aW5nLWZvcm0vLi9zcmMvZmFrZUJhY2tlbmQudHMiLCJ3ZWJwYWNrOi8vYXV0by12YWxpZGF0aW5nLWZvcm0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXV0by12YWxpZGF0aW5nLWZvcm0vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBMb2FkRGF0YVJlcXVlc3Qge1xuICBsYXN0SWQ/OiBudW1iZXI7XG4gIHBhZ2VTaXplPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFR3ZWV0IHtcbiAgaWQ6IG51bWJlcjtcbiAgdGV4dDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZERhdGEge1xuICAgIHR3ZWV0czogVHdlZXRbXSxcbiAgICBsYXN0SWQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFR3ZWV0TG9hZGVyIHtcbiAgcHJpdmF0ZSB0d2VldHMhOiBUd2VldFtdO1xuICBwcml2YXRlIERFRkFVTFRfUEFHRV9TSVpFID0gMTA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5nZW5lcmF0ZUZha2VUd2VldHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVGYWtlVHdlZXRzKCk6IHZvaWQge1xuICAgIHRoaXMudHdlZXRzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDA7IGkrKykge1xuICAgICAgdGhpcy50d2VldHMucHVzaCh7XG4gICAgICAgIGlkOiBpLFxuICAgICAgICB0ZXh0OiBgVGhpcyBpcyBqdXN0IGEgZmFrZSB0d2VldCwgSWQgaXMgJHtpfWAsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbG9hZERhdGEocmVxdWVzdDogTG9hZERhdGFSZXF1ZXN0KTogUHJvbWlzZTxMb2FkZWREYXRhPiB7XG4gICAgLy9MZXQncyBmYWtlIGFuIGFzeW5jIHByb2Nlc3MgaGVyZVxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxMb2FkZWREYXRhPigocmVzb2x2ZSkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGxhc3RJZCA9IHJlcXVlc3QubGFzdElkIHx8IDA7XG4gICAgICAgIGNvbnN0IHBhZ2VTaXplID0gcmVxdWVzdC5wYWdlU2l6ZSB8fCB0aGlzLkRFRkFVTFRfUEFHRV9TSVpFO1xuXG4gICAgICAgIGlmIChsYXN0SWQgPCAwKSB7XG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICB0d2VldHM6IFtdLFxuICAgICAgICAgICAgbGFzdElkOiAwXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaXJzdEVsZW1lbnRJbmRleCA9IHRoaXMudHdlZXRzLmZpbmRJbmRleChcbiAgICAgICAgICAodHdlZXQpID0+IHR3ZWV0LmlkID4gbGFzdElkXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGxhc3RFbGVtZW50SW5kZXggPVxuICAgICAgICAgIGZpcnN0RWxlbWVudEluZGV4ICsgcGFnZVNpemUgPCB0aGlzLnR3ZWV0cy5sZW5ndGhcbiAgICAgICAgICAgID8gZmlyc3RFbGVtZW50SW5kZXggKyBwYWdlU2l6ZVxuICAgICAgICAgICAgOiB0aGlzLnR3ZWV0cy5sZW5ndGggLSAxO1xuXG4gICAgICAgIHJldHVybiByZXNvbHZlKHtcbiAgICAgICAgICAgIHR3ZWV0czogdGhpcy50d2VldHMuc2xpY2UoZmlyc3RFbGVtZW50SW5kZXgsIGxhc3RFbGVtZW50SW5kZXgpLFxuICAgICAgICAgICAgbGFzdElkOiB0aGlzLnR3ZWV0c1tsYXN0RWxlbWVudEluZGV4XS5pZFxuICAgICAgICB9KTtcbiAgICAgIH0sIDMwMDApO1xuICAgIH0pO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgTG9hZERhdGFSZXF1ZXN0LCBUd2VldCwgVHdlZXRMb2FkZXIgfSBmcm9tIFwiLi9mYWtlQmFja2VuZFwiO1xuXG5jb25zdCB0d2VldExvYWRlciA9IG5ldyBUd2VldExvYWRlcigpO1xuY29uc3QgZGF0YVRvTG9hZDogTG9hZERhdGFSZXF1ZXN0ID0geyBsYXN0SWQ6IDAsIHBhZ2VTaXplOiAxNSB9O1xuY29uc3QgdHdlZXRzQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLnR3ZWV0c1wiXG4pIGFzIEhUTUxEaXZFbGVtZW50O1xuY29uc3QgbG9hZGVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9hZGVyXCIpO1xubGV0IGlzRGF0YUxvYWRpbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gbG9hZERhdGEoKSB7XG4gIGxvYWRlckVsZW1lbnQ/LmNsYXNzTGlzdC5yZW1vdmUoXCJsb2FkZXItLWludmlzaWJsZVwiKTtcbiAgICBpc0RhdGFMb2FkaW5nID0gdHJ1ZTtcbiAgdHdlZXRMb2FkZXIubG9hZERhdGEoZGF0YVRvTG9hZCkudGhlbigobG9hZGVkRGF0YSkgPT4ge1xuICAgIGxvYWRlckVsZW1lbnQ/LmNsYXNzTGlzdC5hZGQoXCJsb2FkZXItLWludmlzaWJsZVwiKTtcbiAgICBpc0RhdGFMb2FkaW5nID0gZmFsc2U7XG4gICAgZGF0YVRvTG9hZC5sYXN0SWQgPSBsb2FkZWREYXRhLmxhc3RJZDtcbiAgICBsb2FkZWREYXRhLnR3ZWV0cy5mb3JFYWNoKCh0d2VldCkgPT4gcmVuZGVyVHdlZXQodHdlZXQpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclR3ZWV0KHR3ZWV0OiBUd2VldCkge1xuICB0d2VldHNDb250YWluZXJFbGVtZW50Py5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgXCJiZWZvcmVlbmRcIixcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cInR3ZWV0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VldF9fY29sdW1uIGF2YXRhclwiPlxuICAgICAgICAgIDxpbWcgY2xhc3M9XCJhdmF0YXJfX2ltYWdlXCIgc3JjPVwiLi9hc3NldHMvbW90b3IucG5nXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VldF9fY29sdW1uIHR3ZWV0X19tYWluXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInR3ZWV0X19tYWluX19oZWFkZXJcIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3M9XCJ0d2VldF9fbWFpbl9faGVhZGVyX19pdGVtIHR3ZWV0X19tYWluX19oZWFkZXJfX2l0ZW0tLW5hbWVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBCbGFoWFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzPVwidHdlZXRfX21haW5fX2hlYWRlcl9faXRlbSB0d2VldF9fbWFpbl9faGVhZGVyX19pdGVtLS1iYWRnZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICBjbGFzcz1cInR3ZWV0X19pY29uIHR3ZWV0X19tYWluX19oZWFkZXJfX2l0ZW1fX2JhZGdlXCJcbiAgICAgICAgICAgICAgICBzcmM9XCJodHRwOi8vZWR1Y2F0aXZlLmlvL3VkYXRhL25XanlsZzVYbG9CL2Zvb3Rlcl9pY29uLnN2Z1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3M9XCJ0d2VldF9fbWFpbl9faGVhZGVyX19pdGVtIHR3ZWV0X19tYWluX19oZWFkZXJfX2l0ZW0tLWhhbmRsZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIEBibGFoeFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzPVwidHdlZXRfX21haW5fX2hlYWRlcl9faXRlbSB0d2VldF9fbWFpbl9faGVhZGVyX19pdGVtLS1kdXJhdGlvblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDdoXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdlZXRfX21haW5fX21lc3NhZ2VcIj5cbiAgICAgICAgICAgICR7dHdlZXQudGV4dH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdlZXRfX2Zvb3RlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3ZWV0X19mb290ZXJfX3N0YXRzXCI+XG4gICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICBjbGFzcz1cInR3ZWV0X19pY29uIHR3ZWV0X19mb290ZXJfX3N0YXRzX19pdGVtXCJcbiAgICAgICAgICAgICAgICBzcmM9XCJodHRwOi8vZWR1Y2F0aXZlLmlvL3VkYXRhL25XanlsZzVYbG9CL2Zvb3Rlcl9pY29uLnN2Z1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VldF9fZm9vdGVyX19zdGF0c19faXRlbVwiPjEwPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VldF9fZm9vdGVyX19zdGF0c1wiPlxuICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ0d2VldF9faWNvbiB0d2VldF9fZm9vdGVyX19zdGF0c19faXRlbVwiXG4gICAgICAgICAgICAgICAgc3JjPVwiaHR0cDovL2VkdWNhdGl2ZS5pby91ZGF0YS9uV2p5bGc1WGxvQi9mb290ZXJfaWNvbi5zdmdcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdlZXRfX2Zvb3Rlcl9fc3RhdHNfX2l0ZW1cIj45MDA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3ZWV0X19mb290ZXJfX3N0YXRzXCI+XG4gICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICBjbGFzcz1cInR3ZWV0X19pY29uIHR3ZWV0X19mb290ZXJfX3N0YXRzX19pdGVtXCJcbiAgICAgICAgICAgICAgICBzcmM9XCJodHRwOi8vZWR1Y2F0aXZlLmlvL3VkYXRhL25XanlsZzVYbG9CL2Zvb3Rlcl9pY29uLnN2Z1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VldF9fZm9vdGVyX19zdGF0c19faXRlbVwiPjEuMUs8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3ZWV0X19mb290ZXJfX3N0YXRzXCI+XG4gICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICBjbGFzcz1cInR3ZWV0X19pY29uIHR3ZWV0X19mb290ZXJfX3N0YXRzX19pdGVtXCJcbiAgICAgICAgICAgICAgICBzcmM9XCJodHRwOi8vZWR1Y2F0aXZlLmlvL3VkYXRhL25XanlsZzVYbG9CL2Zvb3Rlcl9pY29uLnN2Z1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VldF9fbWVudVwiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIGNsYXNzPVwidHdlZXRfX2ljb24gdHdlZXRfX21lbnVfX2ljb25cIlxuICAgICAgICAgICAgc3JjPVwiLi9hc3NldHMvZG93bl9pY29uLnN2Z1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gXG4gICk7XG59XG5cbmxvYWREYXRhKCk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHNjcm9sbGVkVG8gPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyB3aW5kb3cuc2Nyb2xsWTtcbiAgY29uc3Qgc2Nyb2xsTGltaXQgPSBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodDtcbiAgY29uc3Qgc2Nyb2xsVGhyZXNob2xkID0gMzA7XG5cbiAgaWYgKHNjcm9sbExpbWl0IC0gc2Nyb2xsZWRUbyA8PSBzY3JvbGxUaHJlc2hvbGQgJiYgIWlzRGF0YUxvYWRpbmcpIHtcbiAgICBsb2FkRGF0YSgpO1xuICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==