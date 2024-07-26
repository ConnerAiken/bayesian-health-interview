import { rest } from "msw";
import { baseApiUrl } from "../services/weatherApi";

export const handlers = [
  rest.get(`${baseApiUrl}/stations.json`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "1",
          name: "City 1",
          order: 1,
        },
        {
          id: "2",
          name: "City 2",
          order: 2,
        },
        {
          id: "3",
          name: "City 3",
          order: 3,
        },
      ]),
    );
  }),
];
