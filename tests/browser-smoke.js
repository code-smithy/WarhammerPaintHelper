const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const { chromium } = loadPlaywright();
  const executablePath = findBrowserExecutable();
  const server = await startStaticServer();
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  let browser;

  try {
    browser = await chromium.launch({
      executablePath,
      headless: true
    });
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(`pageerror: ${error.message}`));
    page.on("console", message => {
      if (message.type() === "error") {
        errors.push(`console: ${message.text()}`);
      }
    });

    await page.goto(`${baseUrl}/WarhammerPaintHelper.html`, { waitUntil: "networkidle" });
    await page.click("#randomBtn");
    await page.waitForTimeout(250);

    const title = await page.textContent("#schemeTitle");
    const paletteCount = await page.locator("#palette article").count();
    const producerCount = await page.locator("#producerFilters input[type='checkbox']").count();

    if (!title || !title.trim()) {
      throw new Error("Expected a generated scheme title after randomizing.");
    }
    if (paletteCount < 2) {
      throw new Error(`Expected at least 2 palette cards, found ${paletteCount}.`);
    }
    if (producerCount < 1) {
      throw new Error("Expected at least one producer filter checkbox.");
    }
    if (errors.length) {
      throw new Error(`Browser errors:\n${errors.join("\n")}`);
    }

    console.log(`Browser smoke passed: ${title.trim()} (${paletteCount} palette cards).`);
  } finally {
    if (browser) {
      await browser.close();
    }
    await new Promise(resolve => server.close(resolve));
  }
}

function loadPlaywright() {
  try {
    return require("playwright-core");
  } catch (coreError) {
    try {
      return require("playwright");
    } catch (playwrightError) {
      throw new Error(
        "Install Playwright first: npm install --save-dev playwright-core"
      );
    }
  }
}

function findBrowserExecutable() {
  const candidates = [
    process.env.PLAYWRIGHT_BROWSER_EXECUTABLE,
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  ].filter(Boolean);
  const executablePath = candidates.find(candidate => fs.existsSync(candidate));
  if (!executablePath) {
    throw new Error(
      "No Edge or Chrome executable found. Set PLAYWRIGHT_BROWSER_EXECUTABLE to a browser path."
    );
  }
  return executablePath;
}

function startStaticServer() {
  const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, "http://127.0.0.1");
    const pathname = requestUrl.pathname === "/" ? "/WarhammerPaintHelper.html" : requestUrl.pathname;
    if (pathname === "/favicon.ico") {
      response.writeHead(204, { "Cache-Control": "no-store" });
      response.end();
      return;
    }
    const filePath = path.resolve(root, "." + decodeURIComponent(pathname));

    if (!filePath.startsWith(root + path.sep)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }
      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream"
      });
      response.end(data);
    });
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}
