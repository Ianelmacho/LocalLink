import { writeFile } from "node:fs/promises";

const width = Number(process.argv[2] || 1680);
const height = Number(process.argv[3] || 945);
const output = process.argv[4] || "preview_journey.png";
const pages = await (await fetch("http://127.0.0.1:9225/json")).json();
const page = pages.find((entry) => entry.type === "page" && /(?:localhost|127\.0\.0\.1):9000/.test(entry.url));
if (!page) throw new Error("No Local Link browser tab found.");

const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let id = 0;
const pending = new Map();
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  message.error ? reject(new Error(message.error.message)) : resolve(message.result);
});

const send = (method, params = {}) => new Promise((resolve, reject) => {
  const requestId = ++id;
  pending.set(requestId, { resolve, reject });
  socket.send(JSON.stringify({ id: requestId, method, params }));
});

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url: "http://127.0.0.1:9000/?v=342" });
await new Promise((resolve) => setTimeout(resolve, 2500));
const metrics = await send("Runtime.evaluate", {
  expression: `(() => {
    document.querySelectorAll('[data-animate]').forEach((node) => node.classList.add('is-visible'));
    const section = document.querySelector('.journey');
    window.scrollTo(0, section.offsetTop);
    return {
      y: window.scrollY,
      sectionHeight: section.offsetHeight,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollHeight: document.documentElement.scrollHeight,
    };
  })()`,
  returnByValue: true,
});
await new Promise((resolve) => setTimeout(resolve, 800));
const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
await writeFile(output, Buffer.from(shot.data, "base64"));
console.log(JSON.stringify(metrics.result.value));
socket.close();
process.exit(0);
