import { rest } from "msw";

const IMAGE_API = "https://images-api.nasa.gov/search?q=moon";
export const handlers = [
  rest.get(IMAGE_API, (req, res, ctx) => {
    const filter = req.url.searchParams.get("q");
    return res(
      ctx.json({
        collection: {
          items: [
            {
              links: [
                {
                  rel: "preview",
                  href: "https://images-assets.nasa.gov/video/test.jpg",
                  render: "image",
                },
              ],
              data: [],
              href: "https://images-assets.nasa.gov/video/NHQ_2019_0311_Go Forward to the Moon/collection.json",
            },
            {
              links: [
                {
                  rel: "preview",
                  href: "https://images-assets.nasa.gov/video/test2.jpg",
                  render: "image",
                },
              ],
              data: [],
              href: "https://images-assets.nasa.gov/video/NHQ_2019_0311_Go Forward to the Moon/collection.json",
            },
          ],
        },
      })
    );
  }),
];
