import { HttpPostClient } from "data/protocols/http/http-post-client";

export class HttpClientPostSpy implements HttpPostClient {
  url?: string;
  async post(url: string): Promise<void> {
    this.url = url;
    return Promise.resolve();
  }
}
