import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = req.query;

  if (!accessToken || typeof accessToken !== "string") {
    res.status(400).json({ error: "Access token not provided or invalid" });
    return;
  }

  const response = await fetch("https://open-api.tiktok.com/user/info/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userInfo = await response.json();

  if (userInfo) {
    res.status(200).json(userInfo);
  } else {
    res.status(400).json({ error: "Failed to fetch user info" });
  }
}
