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
        for (let i = 1; i <= 40; i++) {
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
                /*if (lastId < 0) {
                  resolve({
                    tweets: [],
                    lastId: this.tweets.length
                  });
                }*/
                const firstElementIndex = this.tweets.findIndex((tweet) => tweet.id > lastId);
                if (firstElementIndex < 0) {
                    resolve({
                        tweets: [],
                        lastId: this.tweets.length,
                        isThereMoreData: false
                    });
                }
                const lastElementIndex = firstElementIndex + pageSize < this.tweets.length
                    ? firstElementIndex + pageSize
                    : this.tweets.length;
                return resolve({
                    tweets: this.tweets.slice(firstElementIndex, lastElementIndex),
                    lastId: this.tweets[lastElementIndex - 1].id,
                    isThereMoreData: lastElementIndex <= this.tweets.length - 1
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
let isThereisMoreData = false;
function loadData() {
    loaderElement === null || loaderElement === void 0 ? void 0 : loaderElement.classList.remove("loader--invisible");
    isDataLoading = true;
    tweetLoader.loadData(dataToLoad).then((loadedData) => {
        loaderElement === null || loaderElement === void 0 ? void 0 : loaderElement.classList.add("loader--invisible");
        isDataLoading = false;
        isThereisMoreData = loadedData.isThereMoreData;
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
    if (scrollLimit - scrolledTo <= scrollThreshold && !isDataLoading && isThereisMoreData) {
        loadData();
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFlLEdBQUcsRUFBRSxDQUFDO0lBRTNCLElBQUksV0FBVyxHQUFHLFVBQVUsSUFBSSxlQUFlLElBQUksQ0FBQyxhQUFhLElBQUksaUJBQWlCLEVBQUU7UUFDdEYsUUFBUSxFQUFFLENBQUM7S0FDWjtBQUNILENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXV0by12YWxpZGF0aW5nLWZvcm0vLi9zcmMvZmFrZUJhY2tlbmQudHMiLCJ3ZWJwYWNrOi8vYXV0by12YWxpZGF0aW5nLWZvcm0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXV0by12YWxpZGF0aW5nLWZvcm0vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBMb2FkRGF0YVJlcXVlc3Qge1xuICBsYXN0SWQ/OiBudW1iZXI7XG4gIHBhZ2VTaXplPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFR3ZWV0IHtcbiAgaWQ6IG51bWJlcjtcbiAgdGV4dDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZERhdGEge1xuICAgIHR3ZWV0czogVHdlZXRbXSxcbiAgICBsYXN0SWQ6IG51bWJlcjtcbiAgICBpc1RoZXJlTW9yZURhdGE6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIFR3ZWV0TG9hZGVyIHtcbiAgcHJpdmF0ZSB0d2VldHMhOiBUd2VldFtdO1xuICBwcml2YXRlIERFRkFVTFRfUEFHRV9TSVpFID0gMTA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5nZW5lcmF0ZUZha2VUd2VldHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVGYWtlVHdlZXRzKCk6IHZvaWQge1xuICAgIHRoaXMudHdlZXRzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA0MDsgaSsrKSB7XG4gICAgICB0aGlzLnR3ZWV0cy5wdXNoKHtcbiAgICAgICAgaWQ6IGksXG4gICAgICAgIHRleHQ6IGBUaGlzIGlzIGp1c3QgYSBmYWtlIHR3ZWV0LCBJZCBpcyAke2l9YCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBsb2FkRGF0YShyZXF1ZXN0OiBMb2FkRGF0YVJlcXVlc3QpOiBQcm9taXNlPExvYWRlZERhdGE+IHtcbiAgICAvL0xldCdzIGZha2UgYW4gYXN5bmMgcHJvY2VzcyBoZXJlXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPExvYWRlZERhdGE+KChyZXNvbHZlKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgbGFzdElkID0gcmVxdWVzdC5sYXN0SWQgfHwgMDtcbiAgICAgICAgY29uc3QgcGFnZVNpemUgPSByZXF1ZXN0LnBhZ2VTaXplIHx8IHRoaXMuREVGQVVMVF9QQUdFX1NJWkU7XG5cbiAgICAgICAgLyppZiAobGFzdElkIDwgMCkge1xuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgdHdlZXRzOiBbXSxcbiAgICAgICAgICAgIGxhc3RJZDogdGhpcy50d2VldHMubGVuZ3RoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0qL1xuXG4gICAgICAgIGNvbnN0IGZpcnN0RWxlbWVudEluZGV4ID0gdGhpcy50d2VldHMuZmluZEluZGV4KFxuICAgICAgICAgICh0d2VldCkgPT4gdHdlZXQuaWQgPiBsYXN0SWRcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoZmlyc3RFbGVtZW50SW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgdHdlZXRzOiBbXSxcbiAgICAgICAgICAgICAgbGFzdElkOiB0aGlzLnR3ZWV0cy5sZW5ndGgsXG4gICAgICAgICAgICAgIGlzVGhlcmVNb3JlRGF0YTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICBjb25zdCBsYXN0RWxlbWVudEluZGV4ID1cbiAgICAgICAgICBmaXJzdEVsZW1lbnRJbmRleCArIHBhZ2VTaXplIDwgdGhpcy50d2VldHMubGVuZ3RoXG4gICAgICAgICAgICA/IGZpcnN0RWxlbWVudEluZGV4ICsgcGFnZVNpemVcbiAgICAgICAgICAgIDogdGhpcy50d2VldHMubGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiByZXNvbHZlKHtcbiAgICAgICAgICAgIHR3ZWV0czogdGhpcy50d2VldHMuc2xpY2UoZmlyc3RFbGVtZW50SW5kZXgsIGxhc3RFbGVtZW50SW5kZXgpLFxuICAgICAgICAgICAgbGFzdElkOiB0aGlzLnR3ZWV0c1tsYXN0RWxlbWVudEluZGV4IC0gMV0uaWQsXG4gICAgICAgICAgICBpc1RoZXJlTW9yZURhdGE6IGxhc3RFbGVtZW50SW5kZXggPD0gdGhpcy50d2VldHMubGVuZ3RoIC0gMVxuICAgICAgICB9KTtcbiAgICAgIH0sIDMwMDApO1xuICAgIH0pO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgTG9hZERhdGFSZXF1ZXN0LCBUd2VldCwgVHdlZXRMb2FkZXIgfSBmcm9tIFwiLi9mYWtlQmFja2VuZFwiO1xuXG5jb25zdCB0d2VldExvYWRlciA9IG5ldyBUd2VldExvYWRlcigpO1xuY29uc3QgZGF0YVRvTG9hZDogTG9hZERhdGFSZXF1ZXN0ID0geyBsYXN0SWQ6IDAsIHBhZ2VTaXplOiAxNSB9O1xuY29uc3QgdHdlZXRzQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLnR3ZWV0c1wiXG4pIGFzIEhUTUxEaXZFbGVtZW50O1xuY29uc3QgbG9hZGVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9hZGVyXCIpO1xubGV0IGlzRGF0YUxvYWRpbmcgPSBmYWxzZTtcbmxldCBpc1RoZXJlaXNNb3JlRGF0YSA9IGZhbHNlO1xuXG5mdW5jdGlvbiBsb2FkRGF0YSgpIHtcbiAgbG9hZGVyRWxlbWVudD8uY2xhc3NMaXN0LnJlbW92ZShcImxvYWRlci0taW52aXNpYmxlXCIpO1xuICBpc0RhdGFMb2FkaW5nID0gdHJ1ZTtcblxuICB0d2VldExvYWRlci5sb2FkRGF0YShkYXRhVG9Mb2FkKS50aGVuKChsb2FkZWREYXRhKSA9PiB7XG4gICAgbG9hZGVyRWxlbWVudD8uY2xhc3NMaXN0LmFkZChcImxvYWRlci0taW52aXNpYmxlXCIpO1xuICAgIGlzRGF0YUxvYWRpbmcgPSBmYWxzZTtcbiAgICBpc1RoZXJlaXNNb3JlRGF0YSA9IGxvYWRlZERhdGEuaXNUaGVyZU1vcmVEYXRhO1xuICAgIGRhdGFUb0xvYWQubGFzdElkID0gbG9hZGVkRGF0YS5sYXN0SWQ7XG4gICAgbG9hZGVkRGF0YS50d2VldHMuZm9yRWFjaCgodHdlZXQpID0+IHJlbmRlclR3ZWV0KHR3ZWV0KSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUd2VldCh0d2VldDogVHdlZXQpIHtcbiAgdHdlZXRzQ29udGFpbmVyRWxlbWVudD8uaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgYFxuICAgIDxkaXYgY2xhc3M9XCJ0d2VldFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidHdlZXRfX2NvbHVtbiBhdmF0YXJcIj5cbiAgICAgICAgICA8aW1nIGNsYXNzPVwiYXZhdGFyX19pbWFnZVwiIHNyYz1cIi4vYXNzZXRzL21vdG9yLnBuZ1wiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidHdlZXRfX2NvbHVtbiB0d2VldF9fbWFpblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VldF9fbWFpbl9faGVhZGVyXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzPVwidHdlZXRfX21haW5fX2hlYWRlcl9faXRlbSB0d2VldF9fbWFpbl9faGVhZGVyX19pdGVtLS1uYW1lXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgQmxhaFhcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cInR3ZWV0X19tYWluX19oZWFkZXJfX2l0ZW0gdHdlZXRfX21haW5fX2hlYWRlcl9faXRlbS0tYmFkZ2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ0d2VldF9faWNvbiB0d2VldF9fbWFpbl9faGVhZGVyX19pdGVtX19iYWRnZVwiXG4gICAgICAgICAgICAgICAgc3JjPVwiaHR0cDovL2VkdWNhdGl2ZS5pby91ZGF0YS9uV2p5bGc1WGxvQi9mb290ZXJfaWNvbi5zdmdcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzPVwidHdlZXRfX21haW5fX2hlYWRlcl9faXRlbSB0d2VldF9fbWFpbl9faGVhZGVyX19pdGVtLS1oYW5kbGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBAYmxhaHhcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cInR3ZWV0X19tYWluX19oZWFkZXJfX2l0ZW0gdHdlZXRfX21haW5fX2hlYWRlcl9faXRlbS0tZHVyYXRpb25cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA3aFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInR3ZWV0X19tYWluX19tZXNzYWdlXCI+XG4gICAgICAgICAgICAke3R3ZWV0LnRleHR9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInR3ZWV0X19mb290ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VldF9fZm9vdGVyX19zdGF0c1wiPlxuICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ0d2VldF9faWNvbiB0d2VldF9fZm9vdGVyX19zdGF0c19faXRlbVwiXG4gICAgICAgICAgICAgICAgc3JjPVwiaHR0cDovL2VkdWNhdGl2ZS5pby91ZGF0YS9uV2p5bGc1WGxvQi9mb290ZXJfaWNvbi5zdmdcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdlZXRfX2Zvb3Rlcl9fc3RhdHNfX2l0ZW1cIj4xMDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdlZXRfX2Zvb3Rlcl9fc3RhdHNcIj5cbiAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIGNsYXNzPVwidHdlZXRfX2ljb24gdHdlZXRfX2Zvb3Rlcl9fc3RhdHNfX2l0ZW1cIlxuICAgICAgICAgICAgICAgIHNyYz1cImh0dHA6Ly9lZHVjYXRpdmUuaW8vdWRhdGEvbldqeWxnNVhsb0IvZm9vdGVyX2ljb24uc3ZnXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3ZWV0X19mb290ZXJfX3N0YXRzX19pdGVtXCI+OTAwPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VldF9fZm9vdGVyX19zdGF0c1wiPlxuICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ0d2VldF9faWNvbiB0d2VldF9fZm9vdGVyX19zdGF0c19faXRlbVwiXG4gICAgICAgICAgICAgICAgc3JjPVwiaHR0cDovL2VkdWNhdGl2ZS5pby91ZGF0YS9uV2p5bGc1WGxvQi9mb290ZXJfaWNvbi5zdmdcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdlZXRfX2Zvb3Rlcl9fc3RhdHNfX2l0ZW1cIj4xLjFLPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VldF9fZm9vdGVyX19zdGF0c1wiPlxuICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ0d2VldF9faWNvbiB0d2VldF9fZm9vdGVyX19zdGF0c19faXRlbVwiXG4gICAgICAgICAgICAgICAgc3JjPVwiaHR0cDovL2VkdWNhdGl2ZS5pby91ZGF0YS9uV2p5bGc1WGxvQi9mb290ZXJfaWNvbi5zdmdcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidHdlZXRfX21lbnVcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBjbGFzcz1cInR3ZWV0X19pY29uIHR3ZWV0X19tZW51X19pY29uXCJcbiAgICAgICAgICAgIHNyYz1cIi4vYXNzZXRzL2Rvd25faWNvbi5zdmdcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YFxuICApO1xufVxuXG5sb2FkRGF0YSgpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIChldmVudCkgPT4ge1xuICBjb25zdCBzY3JvbGxlZFRvID0gd2luZG93LmlubmVySGVpZ2h0ICsgd2luZG93LnNjcm9sbFk7XG4gIGNvbnN0IHNjcm9sbExpbWl0ID0gZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQ7XG4gIGNvbnN0IHNjcm9sbFRocmVzaG9sZCA9IDMwO1xuXG4gIGlmIChzY3JvbGxMaW1pdCAtIHNjcm9sbGVkVG8gPD0gc2Nyb2xsVGhyZXNob2xkICYmICFpc0RhdGFMb2FkaW5nICYmIGlzVGhlcmVpc01vcmVEYXRhKSB7XG4gICAgbG9hZERhdGEoKTtcbiAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=