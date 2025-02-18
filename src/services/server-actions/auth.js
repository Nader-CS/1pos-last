"use server";
export const generatePublicToken = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}oauth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
      cache: "no-store",
    },
  );
  const transformedResponse = await response?.json();
  return transformedResponse;
};
