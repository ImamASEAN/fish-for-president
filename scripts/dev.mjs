const port = process.env.PORT || "4174";
process.env.PORT = port;

console.log(`Starting Fish for President dev server on http://127.0.0.1:${port}`);

try {
  await import("./server.mjs");
} catch (error) {
  console.error(error);
  process.exit(1);
}
