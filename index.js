const puppeteer = require("puppeteer");
const fs = require("fs");
const axios = require("axios");

(async () => {
  const url = "https://oatbadstar67.github.io/baccarat-template/";

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 1200 });
  await page.goto(url, { waitUntil: "networkidle2" });

  // Screenshot to buffer
  const imageBuffer = await page.screenshot({ fullPage: true });
  await browser.close();

  // ส่งไป Telegram
  const telegramToken = "8067556174:AAHQZYkg8iaIvrUww-Q34HU_nKt_IOkhnnc";
  const chatId = "-4756018036";
  const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendPhoto`;

  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("photo", imageBuffer, "capture.png");

  await axios.post(telegramUrl, formData, {
    headers: formData.getHeaders(),
  });

  console.log("✅ Image sent to Telegram");
})();
