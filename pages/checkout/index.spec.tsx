import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkout from "./index.page";
import { getServerSideProps } from "./index.page";
import { GetServerSidePropsContext } from "next";
import { comicMock } from "dh-marvel/test/mocks/comic";
import { ParsedUrlQuery } from "querystring";
import { setupWorker, rest } from "msw";



describe("ComicIDPage", () => {
  describe("when rendering default page", () => {
    it("should fetch the data", async () => {
      render(
          <Checkout comic={comicMock} />
      );
      const title = screen.getByText("Marvel Previews (2017)");
      expect(title).toBeInTheDocument();
    });
    it("server side good path", async () => {
      const context = {
        query : { comic: "1"} as ParsedUrlQuery,
      };
      const value = await getServerSideProps(context as GetServerSidePropsContext);
      expect(value).toEqual({"props": { comic : {"id": 1,"oldPrice": 87,"price": 72,"stock": 2,}}})
    }),
    it("server side bad path", async () => {
      const context = {
        query : { comic: ""} as ParsedUrlQuery,
      };
      const value = await getServerSideProps(context as GetServerSidePropsContext);
      expect(value).toEqual({"props": { comic : {"id": 0,"oldPrice": 48,"price": 48,"stock": 0,}}})
    })
  });
});
