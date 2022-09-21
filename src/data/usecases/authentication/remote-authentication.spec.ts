import { HttpClientPostSpy } from "@/data/test/mock-htpp-client";
import { RemoteAuthentication } from "./remote-authentication";
import { mockAuthentication } from "@/domain/test/mock-authentication";
import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { faker } from "@faker-js/faker";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpClientPostSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpClientPostSpy();

  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoteAuthentication", () => {
  it("Should call httpClient with correct url ", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  it("Should call httpClient with correct body ", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });
  it("Should throw InvalidCredentialsError if HttpPostClient returns 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});
