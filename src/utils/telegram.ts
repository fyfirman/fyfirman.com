/* eslint-disable no-useless-escape */
export const escapeMarkdown = (text: string = "") => {
  return text
    .replace(/\_/g, "\\_")
    .replace(/\*/g, "\\*")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/\~/g, "\\~")
    .replace(/\`/g, "\\`")
    .replace(/\>/g, "\\>")
    .replace(/\#/g, "\\#")
    .replace(/\+/g, "\\+")
    .replace(/\-/g, "\\-")
    .replace(/\=/g, "\\=")
    .replace(/\|/g, "\\|")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/\./g, "\\.")
    .replace(/\!/g, "\\!");
};

export const sendNotificationToTelegram = async (message: string) => {
  if (!process.env.TELEGRAM_HTTP_TOKEN) {
    throw new Error("TELEGRAM_HTTP_TOKEN is missing");
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    chat_id: "-593919456",
    text: message,
    parse_mode: "MarkdownV2",
  });

  const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_HTTP_TOKEN}/sendMessage`, {
    method: "POST",
    headers: myHeaders,
    body: raw,
    cache: "no-cache",
  });

  const response = await res.json();

  if (!res.ok) {
    console.error(`ERROR: ${JSON.stringify(response)}`);
  }
  return res;
};
