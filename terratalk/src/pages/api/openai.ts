// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY });



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userIn } = req.query;

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "create an overpass ql query for:" + userIn }],
            model: "gpt-3.5-turbo",
        });
        res.status(200).json(completion.choices[0])

    } catch (err: any) {
        console.log("error using OpenAI");
        console.log(err.error.message);
        res.status(500).json(err.error.message)
    }


    // console.log(req.method);
    // if (req.method === "GET") {
    //     res.status(200).json({ name: "Bob" });
    // } else if (req.method === "POST") {

    // }


    // console.log('api key', process.env.NEXT_PUBLIC_API_KEY);

}




