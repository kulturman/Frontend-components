import { LoadDataRequest, Tweet, TweetLoader } from "./fakeBackend";

const tweetLoader = new TweetLoader();
const dataToLoad: LoadDataRequest = { lastId: 0, pageSize: 5 };
const tweetsContainerElement = document.querySelector(
  ".tweets"
) as HTMLDivElement;
const loaderElement = document.querySelector(".loader");

function loadData() {
  loaderElement?.classList.remove("loader--invisible");

  tweetLoader.loadData(dataToLoad).then((tweets) => {
    loaderElement?.classList.add("loader--invisible");
    tweets.forEach((tweet) => renderTweet(tweet));
  });
}

function renderTweet(tweet: Tweet) {
  tweetsContainerElement?.insertAdjacentHTML(
    "beforeend",
    `
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
      </div>`
  );
}

loadData();
