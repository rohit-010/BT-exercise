import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../mocks/server";
import ImageFinder from "../ImageFinder";

const IMAGE_API = "https://images-api.nasa.gov/search?q=moon";
const ERROR_MSG = "Sorry something went wrong!";

describe("Image Finder ", () => {
  //  jest.setTimeout(30000);
  test("displays image from server", async () => {
    render(<ImageFinder />);
    await waitFor(async () => {
      const images = await screen.findAllByRole("img", { name: /test/i });
      expect(images).toHaveLength(2);
    });
  });

  test("server returns error when api is called", async () => {
    beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
    server.resetHandlers(
      rest.get(IMAGE_API, (req, res, ctx) => {
        res(ctx.status(500));
      })
    );

    render(<ImageFinder />);
    await waitFor(async () => {
      const errorMessage = screen.getByText(ERROR_MSG);
      expect(errorMessage).toHaveTextContent("Sorry something went wrong");
    });
  });
});
