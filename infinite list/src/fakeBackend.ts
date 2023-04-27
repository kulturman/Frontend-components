export interface LoadDataRequest {
  lastId?: number;
  pageSize?: number;
}

export interface Tweet {
  id: number;
  text: string;
}

export interface LoadedData {
    tweets: Tweet[],
    lastId: number;
}

export class TweetLoader {
  private tweets!: Tweet[];
  private DEFAULT_PAGE_SIZE = 10;

  constructor() {
    this.generateFakeTweets();
  }

  private generateFakeTweets(): void {
    this.tweets = [];

    for (let i = 1; i <= 100; i++) {
      this.tweets.push({
        id: i,
        text: `This is just a fake tweet, Id is ${i}`,
      });
    }
  }

  public loadData(request: LoadDataRequest): Promise<LoadedData> {
    //Let's fake an async process here
    return new Promise<LoadedData>((resolve) => {
      setTimeout(() => {
        const lastId = request.lastId || 0;
        const pageSize = request.pageSize || this.DEFAULT_PAGE_SIZE;

        if (lastId < 0) {
          resolve({
            tweets: [],
            lastId: 0
          });
        }

        const firstElementIndex = this.tweets.findIndex(
          (tweet) => tweet.id > lastId
        );
        const lastElementIndex =
          firstElementIndex + pageSize < this.tweets.length
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
