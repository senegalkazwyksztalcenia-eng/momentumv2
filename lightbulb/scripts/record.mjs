import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const CDP = process.env.CDP_URL ?? "http://127.0.0.1:9333";
const URL = process.env.PREVIEW_URL ?? "http://127.0.0.1:5199/";
const OUT = process.env.OUT_DIR ?? "/opt/cursor/artifacts/videos";
const DURATION_MS = Number(process.env.RECORD_MS ?? 9000);
const INTERVAL_MS = 100;

mkdirSync(OUT, { recursive: true });

let id = 0;
const pending = new Map();

function cdp(ws, method, params = {}) {
  const msgId = ++id;
  ws.send(JSON.stringify({ id: msgId, method, params }));
  return new Promise((resolve, reject) => {
    pending.set(msgId, { resolve, reject });
    setTimeout(() => {
      if (pending.has(msgId)) {
        pending.delete(msgId);
        reject(new Error(`timeout ${method}`));
      }
    }, 60000);
  });
}

function attach(ws) {
  ws.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) reject(new Error(data.error.message));
      else resolve(data.result);
    }
  });
}

async function connect() {
  const targets = await fetch(`${CDP}/json/list`).then((r) => r.json());
  const page = targets.find((t) => t.type === "page" && t.url !== "about:blank") ?? targets[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener("open", resolve));
  attach(ws);
  await cdp(ws, "Page.enable");
  return ws;
}

async function record(ws, name, width, height, mobile = false) {
  const framesDir = join(OUT, `${name}-frames`);
  rmSync(framesDir, { recursive: true, force: true });
  mkdirSync(framesDir, { recursive: true });

  await cdp(ws, "Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: mobile ? 2 : 1,
    mobile,
  });
  await cdp(ws, "Page.navigate", { url: URL });
  await new Promise((r) => setTimeout(r, 400));

  const frameCount = Math.ceil(DURATION_MS / INTERVAL_MS);
  for (let i = 0; i < frameCount; i += 1) {
    const { data } = await cdp(ws, "Page.captureScreenshot", {
      format: "jpeg",
      quality: 85,
      fromSurface: true,
    });
    writeFileSync(
      join(framesDir, `frame-${String(i).padStart(5, "0")}.jpg`),
      Buffer.from(data, "base64"),
    );
    await new Promise((r) => setTimeout(r, INTERVAL_MS));
  }

  const output = join(OUT, `${name}.mp4`);
  await encodeVideo(framesDir, output, 1000 / INTERVAL_MS);
  rmSync(framesDir, { recursive: true, force: true });
  console.log(`wrote ${output}`);
}

function encodeVideo(framesDir, output, fps) {
  return new Promise((resolve, reject) => {
    const ff = spawn("ffmpeg", [
      "-y",
      "-framerate",
      String(fps),
      "-i",
      join(framesDir, "frame-%05d.jpg"),
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "-crf",
      "20",
      output,
    ]);
    ff.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exit ${code}`))));
    ff.stderr.on("data", () => {});
  });
}

const ws = await connect();
await record(ws, "lightbulb-desktop", 1440, 900, false);
await record(ws, "lightbulb-mobile", 390, 844, true);
ws.close();
console.log(`Videos saved to ${OUT}`);
