const puppeteer = require("puppeteer");
const link = "https://10fastfingers.com/text-practice/new";
let page;
(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ["--start-maximized"],
            slowMo: 20,
            defaultViewport: null,
        });
        page = await browser.newPage();
        await page.goto(link);
        await page.waitForSelector(
            "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"
        );
        await page.click(
            "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"
        );
        let newLink = await page.evaluate((selector) => {
            return document.querySelector(selector).getAttribute("href");
        }, ".title>a");
        newLink = "https://10fastfingers.com" + newLink;
        await page.goto(newLink);
        await page.waitForSelector("#row1");
        let textToType = await page.evaluate((selector) => {
            let arr = document.querySelector(selector).innerText;
            return arr;
        }, "#row1");
        await page.waitForSelector("#text_typed");
        await page.type("#text_typed",textToType);
    } catch (err) {
        console.log(err);
    }
})();
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
  });
