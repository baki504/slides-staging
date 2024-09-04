/**
 * @fileoverview Generates slide HTML files from markdown files in the slides directory.
 * @module generate-slide-htmls
 */

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { exec } = require("child_process");

const PROJECT_ROOT_DIR = process.cwd();
const SLIDES_DIR = path.join(PROJECT_ROOT_DIR, "slides");
const PUBLIC_DIR = path.join(PROJECT_ROOT_DIR, "public");
const canonicalUrl = process.env.URL || "http://localhost:8080";

/**
 * Returns the command to generate a slide HTML with marp-cli.
 * @param {*} markdownName
 * @returns {string} - The command to generate a slide HTML.
 */
const getCommand = (markdownName) => {
  const baseName = path.parse(markdownName).name;
  const ogImagePath = `${canonicalUrl}/${baseName}.png`;
  const slideUrl = `${canonicalUrl}/${baseName}.html`;
  const markdownPath = path.join(SLIDES_DIR, markdownName);
  const slideHtmlPath = path.join(
    PUBLIC_DIR,
    markdownName.replace(".md", ".html")
  );

  return `npm run marp -- --og-image ${ogImagePath} --url ${slideUrl} ${markdownPath} -o ${slideHtmlPath}`;
};

const execAsync = promisify(exec);

/**
 * Generates slide HTML files from markdown files in the slides directory.
 */
const generateSlideHtmls = async () => {
  try {
    const markdownNames = fs
      .readdirSync(SLIDES_DIR)
      .filter((name) => name.endsWith(".md"));

    for (const markdownName of markdownNames) {
      try {
        const { stdout, stderr } = await execAsync(getCommand(markdownName));
        console.log(stdout);
        console.log(stderr);
        console.log(`Command executed successfully for [${markdownName}].`);
      } catch (error) {
        console.error(`Error running command for [${markdownName}]:`, error);
      }
    }
  } catch (err) {
    console.error("1Error reading slides directory:", err);
  }
};

generateSlideHtmls();
