import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { escapeMarkdown, sendNotificationToTelegram } from "~/utils/telegram";

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const schema = z.object({
    message: z.string().max(200),
    senderName: z.string().optional(),
    isPublic: z.boolean().optional(),
  });

  try {
    const body = schema.parse(req.body);

    const senderName = body.senderName ? escapeMarkdown(body.senderName) : "anonymous";
    const message = escapeMarkdown(body.message);
    const isPublic = body.isPublic ? "public" : "private";

    await sendNotificationToTelegram([`📩 *${senderName}* sent a ${isPublic} message\n`, message].join("\n"));

    res.status(200).json({ message: "Message successfully sent" });
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
}
