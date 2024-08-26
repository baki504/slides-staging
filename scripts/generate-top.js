/**
 * @fileoverview Generates the index.html file with slide links.
 */

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.resolve(PROJECT_ROOT_DIR, "public");

/**
 * Truncates the target string to the specified maximum length.
 * e.g. truncate("Hello, World!", 5) => "Hello..."
 * @param {*} target
 * @param {*} maxLength
 * @returns
 */
const truncate = (target, maxLength = 30) =>
  target.length > maxLength ? target.slice(0, maxLength) + "..." : target;

/**
 * Generates a slide card link.
 * @param {*} pathWithoutExtension
 * @returns
 */
const generateSlideCardLink = (pathWithoutExtension) => {
  const slideName = `${pathWithoutExtension}.html`;
  const openGraphImageName = `${pathWithoutExtension}.png`;
  return `
    <a href="${slideName}" class="bg-cover bg-center h-64 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105"
      style="background-image: url('${openGraphImageName}'); background-size: contain; background-repeat: no-repeat; background-position: center;">
      <div class="bg-gray-700 bg-opacity-50 h-full w-full rounded-lg p-4 flex items-end">
        <h2 class="text-white text-sm font-semibold">${truncate(slideName)}</h2>
      </div>
    </a>
  `;
};

/**
 * generates the slide card links in descending order.
 */
const descSortedSlideLinkCards = fs
  .readdirSync(PUBLIC_DIR)
  .filter((filePath) => filePath.endsWith(".html") && filePath !== "index.html")
  .map((filePath) => path.parse(filePath).name)
  .sort((a, b) => b.localeCompare(a))
  .map(generateSlideCardLink)
  .join("\n");

const canonicalUrl = process.env.URL || "http://localhost:8080";

const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CoderDojo磐田 スライド</title>

  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="CoderDojo磐田 スライド">
  <meta property="og:description" content="過去の道場で使用したスライドです。学習や復習にお役立てください。">
  <meta property="og:image" content="${canonicalUrl}/og-image.png">
  <meta property="og:image:alt" content="CoderDojo磐田 スライド">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}/"> 
  <meta property="og:locale" content="ja_JP">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">

  <!-- コンテナ -->
  <div class="container mx-auto p-6">

    <!-- ヘッダー -->
    <h1 class="text-4xl text-center font-bold mb-6 text-blue-600">CoderDojo磐田 スライド</h1>
    <p class="text-center text-gray-700 text-lg mb-8">過去の道場で使用したスライドです。学習や復習にお役立てください。</p>

    <!-- カードのグリッドレイアウト -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${descSortedSlideLinkCards}
    </div>

  </div>

</body>
</html>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, "index.html"), content);

console.log("index.html has been created with slide links.");
