export interface LoadDataRequest {
  lastId?: number;
  pageSize?: number;
}

export interface Tweet {
  id: number;
  text: string;
}

export class TweetLoader {
  private tweets!: Tweet[];
  private DEFAULT_PAGE_SIZE = 10;

  constructor() {
    this.generateFakeTweets();
  }

  private generateFakeTweets(): void {
    this.tweets = [];

    for (let i = 1; i <= 300; i++) {
      this.tweets.push({
        id: i,
        text: `This is just a fake tweet, Id is ${i}`,
      });
    }
  }

  public loadData(request: LoadDataRequest): Promise<Tweet[]> {
    //Let's fake an async process here
    return new Promise<Tweet[]>((resolve) => {
      setTimeout(() => {
        const lastId = request.lastId || 0;
        const pageSize = request.pageSize || this.DEFAULT_PAGE_SIZE;

        if (lastId < 0) {
          resolve([]);
        }

        const firstElementIndex = this.tweets.findIndex(
          (tweet) => tweet.id > lastId
        );
        const lastElementIndex =
          firstElementIndex + pageSize < this.tweets.length
            ? firstElementIndex + pageSize
            : this.tweets.length - 1;

        return resolve(this.tweets.slice(firstElementIndex, lastElementIndex));
      }, 3000);
    });
  }
}
