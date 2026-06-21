import { readFileSync, writeFileSync, existsSync } from "fs";
import { execSync } from "child_process";

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
if (!DEEPL_API_KEY) {
  console.error("DEEPL_API_KEY not set");
  process.exit(1);
}

function getChangedFiles() {
  const diff = execSync(
    "git diff --name-only HEAD~1 HEAD -- 'src/content/blog/'"
  ).toString().trim();
  return diff.split("\n").filter(Boolean);
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: "", body: content };
  return { frontmatter: match[1], body: match[2] };
}

function detectLang(filePath) {
  return filePath.includes("/zh/") ? "zh" : "en";
}

async function translateText(text, sourceLang, targetLang) {
  const resp = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      "Authorization": `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: [text],
      source_lang: sourceLang.toUpperCase(),
      target_lang: targetLang.toUpperCase(),
    }),
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(JSON.stringify(data));
  return data.translations[0].text;
}

function targetPath(filePath) {
  if (filePath.includes("/zh/")) {
    return filePath.replace("/zh/", "/en/");
  }
  return filePath.replace("/en/", "/zh/");
}

async function main() {
  const files = getChangedFiles();
  if (files.length === 0) {
    console.log("No blog files changed.");
    return;
  }

  console.log("Changed blog files:", files);

  for (const file of files) {
    if (!existsSync(file)) {
      console.log(`Skipping deleted file: ${file}`);
      continue;
    }

    const sourceLang = detectLang(file);
    const targetLang = sourceLang === "zh" ? "en" : "zh";
    const dest = targetPath(file);

    if (existsSync(dest)) {
      console.log(`Skipping ${file} — target ${dest} already exists.`);
      continue;
    }

    console.log(`Translating ${file} (${sourceLang} → ${targetLang})`);

    const content = readFileSync(file, "utf-8");
    const { frontmatter, body } = parseFrontmatter(content);

    const translatedBody = await translateText(body, sourceLang, targetLang);

    let result = `---\n${frontmatter}\n---\n\n${translatedBody}\n`;
    writeFileSync(dest, result);

    console.log(`  → ${dest}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
