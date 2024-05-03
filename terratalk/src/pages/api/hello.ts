// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log(req.method);
  if (req.method === "GET") {
    res.status(200).json({ name: "Bob" });
  } else if (req.method === "POST") {
    
  }


  // console.log('api key', process.env.NEXT_PUBLIC_API_KEY);

}
