import configPromise from "@payload-config";

import { getPayload } from "payload";

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 0,
    where: {
      parent: {
        exists: false,
      },
    },
  });
  console.log(data);
  return Response.json("");
};
