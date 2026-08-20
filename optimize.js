const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const { minify } = require('terser');
const sharp = require('sharp');

const cssFile = 'assets/css/main.css';
const jsFile = 'assets/js/main.js';

async function runOptimization() {
    console.log('--- Empezando Optimización ---');

    // 1. Minificar CSS
    if (fs.existsSync(cssFile)) {
        // Pass the file path so clean-css can resolve @import 'variables.css'
        const minifiedCss = new CleanCSS({ level: 2 }).minify([cssFile]);
        fs.writeFileSync('assets/css/main.min.css', minifiedCss.styles);
        console.log(`✅ CSS minificado: ${minifiedCss.stats.originalSize}B -> ${minifiedCss.stats.minifiedSize}B`);
    }

    // 2. Minificar JS
    if (fs.existsSync(jsFile)) {
        const jsContent = fs.readFileSync(jsFile, 'utf8');
        const minifiedJs = await minify(jsContent, {
            compress: { passes: 2 },
            mangle: true
        });
        fs.writeFileSync('assets/js/main.min.js', minifiedJs.code);
        console.log(`✅ JS minificado exitosamente.`);
    }

    // 3. Compresión de Imágenes a WebP
    const imgDirs = [
        'assets/img/branding', 
        'pages/Nishino/images', 
        'pages/Ladrones/src/assets/gallery',
        'pages/Ladrones/gallery',
        'pages/Nebu'
    ];
    
    let processedImages = 0;

    for (const dir of imgDirs) {
        if (!fs.existsSync(dir)) continue;
        
        const files = getAllFiles(dir);
        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                const stats = fs.statSync(file);
                // Si pesa más de 300KB, comprimir
                if (stats.size > 300 * 1024) {
                    const webpPath = file.replace(ext, '.webp');
                    try {
                        await sharp(file)
                            .webp({ quality: 80, effort: 6 })
                            .toFile(webpPath);
                        console.log(`📸 Imagen convertida a WebP: ${webpPath} (Original: ${(stats.size/1024/1024).toFixed(2)}MB)`);
                        processedImages++;
                    } catch(e) {
                        console.error(`❌ Error convirtiendo ${file}:`, e);
                    }
                }
            }
        }
    }
    
    console.log(`--- Optimización Completada (Imágenes procesadas: ${processedImages}) ---`);
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    
    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
        }
    });
    
    return arrayOfFiles;
}

runOptimization();
