import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    res
      .status(400)
      .json({ error: "Authorization code not provided or invalid" });
    return;
  }

  const response = await fetch(
    "https://open-api.tiktok.com/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_key: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY,
        client_secret: process.env.TIKTOK_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI,
      }),
    }
  );

  const data = await response.json();

  if (data.access_token) {
    res.redirect(`/profile?accessToken=${data.access_token}`);
  } else {
    res.status(400).json({ error: "Failed to fetch access token" });
  }
}
