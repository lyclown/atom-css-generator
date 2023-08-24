import { parse } from '@vue/compiler-sfc';
import { writeFileSync, appendFileSync, existsSync } from 'fs';
import path from 'path';
import classRule from './classRule';
import fs from 'fs'

/**
 * 解析Vue文件，返回descriptor对象
 * @param {string} src - Vue文件的源代码
 * @returns {object} - Vue文件的descriptor对象
 */
function parseVueFile(src) {
    try {
        return parse(src).descriptor;
    } catch (error) {
        console.error("解析Vue文件时出错:", error);
        return null;
    }
}

/**
 * 从模板中提取类名
 * @param {string} templateContent - 模板内容
 * @returns {Array} - 提取到的类名数组
 */
function extractClassNamesFromTemplate(templateContent) {
    const matches = templateContent.matchAll(/class="([^"]+)"/g);
    const classNames = new Set();
    for (const match of matches) {
        match[1].split(' ').forEach(className => className.split('-').length >= 2 && classNames.add(className));
    }
    return Array.from(classNames);
}

/**
 * 根据类名生成CSS规则
 * @param {string} className - 类名
 * @returns {string} - 生成的CSS规则
 */
function ruleForClassName(className) {
    const newClassName = classRule.generate(className);
    if (!newClassName) {
        console.log(`未能生成类名：${className}`)
    }
    return newClassName
}

/**
 * 生成并写入style.css文件
 * @param {string} outputPath - 输出路径
 * @param {Array} newClassNames - 新的类名数组
 */
function generateAndWriteStyleCSS(outputPath, newClassNames) {
    const cssFilePath = path.join(outputPath, 'style.css');
    const newCSS = newClassNames
        .map(ruleForClassName)
        .filter(Boolean)
        .join('\n');
    if (existsSync(cssFilePath)) {
        appendFileSync(cssFilePath, newCSS);
    } else {
        writeFileSync(cssFilePath, newCSS);
    }
}
function initializeCollectedClassNames(outputPath, collectedClassNames) {
    // 根据输出路径和已收集的类名，初始化已收集的类名集合
    const cssFilePath = path.join(outputPath, 'style.css');
    if (existsSync(cssFilePath)) {
        // 读取 CSS 文件内容
        const cssContent = fs.readFileSync(cssFilePath, 'utf-8');

        // 假设每个规则都是 `.className { ... }` 这种形式，根据您的实际情况调整这个正则
        const classRegex = /\.([a-zA-Z0-9_-]+) *\{/g;
        let match;
        while ((match = classRegex.exec(cssContent)) !== null) {
            // 将匹配到的类名添加到已收集的类名集合中
            collectedClassNames.add(match[1]);
        }
    }
}

export default function atomCssGenerator(options = {}) {
    const outputPath = options.outputPath || 'public';
    const normalizedPath = outputPath.replace(/^\/|\/$/g, '');
    const collectedClassNames = new Set();
    initializeCollectedClassNames(normalizedPath, collectedClassNames);
    return {
        name: 'vite-plugin-atom-css-generator',
        // 解析Vue文件，提取模板中的类名
        // transform(src, id) {
        //     if (!id.endsWith('.vue')) return;
        //
        //     const descriptor = parseVueFile(src);
        //     if (descriptor && descriptor.template) {
        //         const classNames = extractClassNamesFromTemplate(descriptor.template.content);
        //         classNames.forEach(className => collectedClassNames.add(className));
        //     }
        // },
        // 处理热更新
        async handleHotUpdate({ file, read }) {
            if (file.endsWith('.vue')) {
                const source = await read();
                const descriptor = parseVueFile(source);
                const newClassNames = [];
                if (descriptor && descriptor.template) {
                    const classNames = extractClassNamesFromTemplate(descriptor.template.content);
                    classNames.forEach(className => {
                        if (!collectedClassNames.has(className)) {
                            collectedClassNames.add(className);
                            newClassNames.push(className);
                        }
                    });
                }

                if (newClassNames.length > 0) {
                    generateAndWriteStyleCSS(normalizedPath, newClassNames);
                }
            }
        },
        // 在index.html中插入生成的CSS文件链接
        transformIndexHtml(html) {
            return html.replace(
                '</head>',
                `<link rel="stylesheet" href="/${normalizedPath}/style.css"></head>`
            );
        },
        // 生成并写入style.css文件
        // closeBundle() {
        //     generateAndWriteStyleCSS(normalizedPath, collectedClassNames);
        // }
    };
}
