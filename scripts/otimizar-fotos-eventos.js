#!/usr/bin/env node
/**
 * ============================================================================
 * UTILITÁRIO DE OTIMIZAÇÃO DE FOTOS DE EVENTOS (FASE C)
 * CTA Escola Técnica — Galeria de Eventos
 * ============================================================================
 * Uso:
 *   node scripts/otimizar-fotos-eventos.js <slug-do-evento> <pasta-fotos-originais> [--atualizar-json]
 *
 * Exemplo:
 *   node scripts/otimizar-fotos-eventos.js projetech ./fotos-brutas/projetech --atualizar-json
 *
 * O que este script faz:
 * 1) Lê todas as imagens (.jpg, .jpeg, .png, .webp) da pasta de entrada;
 * 2) Cria a pasta de saída `eventos/<slug-do-evento>/`;
 * 3) Converte e redimensiona cada foto para:
 *    - Miniatura (480w), Média (960w) e Tela Cheia (1600w)
 *    - Formatos modernos WebP e AVIF + fallback JPG (usando `sharp`);
 * 4) Extrai `width` e `height` reais para evitar Layout Shift (CLS = 0);
 * 5) Gera a lista `fotos` com `srcset` pronto para o arquivo `eventos.json`.
 */

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const slug = (args[0] || "").trim().toLowerCase().replace(/[^a-z0-9-_]/g, "-");
const inputDir = args[1] ? path.resolve(args[1]) : "";
const updateJsonFlag = args.includes("--atualizar-json");

if (!slug || !inputDir) {
  console.log(`
Uso:
  node scripts/otimizar-fotos-eventos.js <slug-do-evento> <pasta-fotos-originais> [--atualizar-json]

Exemplo:
  node scripts/otimizar-fotos-eventos.js projetech ./fotos-brutas/projetech --atualizar-json
`);
  process.exit(1);
}

if (!fs.existsSync(inputDir)) {
  console.error(`Erro: A pasta de entrada não foi encontrada: ${inputDir}`);
  process.exit(1);
}

const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "eventos", slug);
fs.mkdirSync(outputDir, { recursive: true });

let sharp = null;
try {
  sharp = require("sharp");
} catch (_e) {
  console.warn(
    "Aviso: pacote 'sharp' não detectado no ambiente atual. Para gerar conversões WebP/AVIF automáticas, instale em ambiente local com: npm i -D sharp"
  );
}

const allowedExts = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const files = fs
  .readdirSync(inputDir)
  .filter((f) => allowedExts.has(path.extname(f).toLowerCase()))
  .sort();

if (files.length === 0) {
  console.error("Nenhuma imagem (.jpg, .jpeg, .png, .webp) encontrada na pasta informada.");
  process.exit(1);
}

const WIDTHS = [480, 960, 1600];

async function processAllPhotos() {
  const fotosGeradas = [];

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    const indexStr = String(i + 1).padStart(2, "0");
    const baseId = `${slug}-${indexStr}`;
    const srcPath = path.join(inputDir, fileName);

    if (sharp) {
      const image = sharp(srcPath).rotate();
      const meta = await image.metadata();
      const aspect = meta.width && meta.height ? meta.width / meta.height : 1.5;
      const outWidth = 1200;
      const outHeight = Math.round(outWidth / aspect);

      const webpParts = [];
      const avifParts = [];

      for (const w of WIDTHS) {
        const relWebp = `eventos/${slug}/${baseId}-${w}w.webp`;
        const relAvif = `eventos/${slug}/${baseId}-${w}w.avif`;
        await sharp(srcPath)
          .rotate()
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(path.join(rootDir, relWebp));
        await sharp(srcPath)
          .rotate()
          .resize({ width: w, withoutEnlargement: true })
          .avif({ quality: 65 })
          .toFile(path.join(rootDir, relAvif));
        webpParts.push(`${relWebp} ${w}w`);
        avifParts.push(`${relAvif} ${w}w`);
      }

      const relThumbJpg = `eventos/${slug}/${baseId}-480w.jpg`;
      const relFullJpg = `eventos/${slug}/${baseId}-1600w.jpg`;

      await sharp(srcPath)
        .rotate()
        .resize({ width: 480, withoutEnlargement: true })
        .jpeg({ quality: 82, progressive: true })
        .toFile(path.join(rootDir, relThumbJpg));

      await sharp(srcPath)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true })
        .toFile(path.join(rootDir, relFullJpg));

      fotosGeradas.push({
        id: baseId,
        thumb: relThumbJpg,
        full: relFullJpg,
        webpSrcset: webpParts.join(", "),
        avifSrcset: avifParts.join(", "),
        sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
        width: outWidth,
        height: outHeight,
        legenda: `[PREENCHER: legenda da foto ${i + 1} do evento ${slug.toUpperCase()}]`,
        alt: `[PREENCHER: texto alternativo da foto ${i + 1} do evento ${slug.toUpperCase()}]`
      });
    } else {
      const ext = path.extname(fileName).toLowerCase();
      const relCopy = `eventos/${slug}/${baseId}${ext}`;
      fs.copyFileSync(srcPath, path.join(rootDir, relCopy));
      fotosGeradas.push({
        id: baseId,
        thumb: relCopy,
        full: relCopy,
        webpSrcset: "",
        avifSrcset: "",
        sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
        width: 1200,
        height: 800,
        legenda: `[PREENCHER: legenda da foto ${i + 1} do evento ${slug.toUpperCase()}]`,
        alt: `[PREENCHER: texto alternativo da foto ${i + 1} do evento ${slug.toUpperCase()}]`
      });
    }
  }

  console.log(`\nProcessadas ${fotosGeradas.length} fotos em eventos/${slug}/`);
  console.log("\nTrecho JSON gerado para 'fotos':\n");
  console.log(JSON.stringify(fotosGeradas, null, 2));

  if (updateJsonFlag) {
    const jsonPath = path.join(rootDir, "eventos.json");
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
      const ev = (data.eventos || []).find((item) => item.id === slug);
      if (ev) {
        ev.fotos = fotosGeradas;
        if (fotosGeradas[0] && (!ev.capa || !ev.capa.src)) {
          ev.capa = {
            src: fotosGeradas[0].thumb,
            webpSrcset: fotosGeradas[0].webpSrcset,
            avifSrcset: fotosGeradas[0].avifSrcset,
            width: fotosGeradas[0].width,
            height: fotosGeradas[0].height,
            alt: `[PREENCHER: texto alternativo da foto de capa do evento ${ev.titulo}]`
          };
        }
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n", "utf8");
        console.log(`\nArquivo eventos.json atualizado automaticamente para o evento '${slug}'.`);
      } else {
        console.log(
          `\nO evento '${slug}' ainda não existe em eventos.json. Adicione o bloco do evento e cole o array 'fotos' acima.`
        );
      }
    }
  }
}

processAllPhotos().catch((err) => {
  console.error("Erro ao processar imagens:", err);
  process.exit(1);
});

