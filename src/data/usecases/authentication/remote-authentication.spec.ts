import { HttpClientSpy } from "../../test/mock-htpp-client";
import { RemoteAuthentication } from "./remote-authentication";

describe("RemoteAuthentication", () => {
  it("Should call httpClient with correct url ", async () => {
    const url = "dougUrl";
    const httpPostClientSpy = new HttpClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
