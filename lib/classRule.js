
// Rule 类  
class ClassRule {
    constructor() {
        this.rules = [
            this.ruleForColorClassName,
            this.ruleForSpacingClassName,
            this.ruleForSizeClassName,
            this.ruleForFontClassName,
            this.ruleForFlexClassName,
            this.ruleForBorderClassName,
            this.ruleForPositionClassName,
            this.ruleForCursorClassName,
            this.ruleForOverflowClassName,
        ];
        this.prefix = ''
    }
    generate(className) {
        if (!className.startsWith(this.prefix)) {
            return ''
        }
        const newClassName = this.handleClassName(className)
        console.log(newClassName, 'newClassName')
        for (const rule of this.rules) {
            const cssRule = rule.call(this, newClassName);
            console.log(`.${className} ${cssRule}`, 'cssRulecssRule')
            if (cssRule) return `.${className} ${cssRule}`;
        }
        return ''
    }
    handleClassName(className) {
        return className.replace(`${this.prefix}-`, '');
    }
    appendUnit(value) {
        console.log(value)
        if (!isNaN(value) && !value.endsWith('%')) {
            console.log(211)
            return `${value}px`;
        }
        console.log(8777)
        return value;
    }
    getPrefix(prefix) {
        this.prefix = prefix
    }
    ruleForColorClassName(className) {
        // 文字颜色规则
        if (className.startsWith('fc-')) {
            return `{ color: #${className.substr(3)}; }`;
        }

        // 背景颜色规则
        else if (className.startsWith('bgc-')) {
            return `{ background-color: #${className.substr(4)}; }`;
        }

        // 边框颜色规则
        else if (className.startsWith('bc-')) {
            return `{ border-color: #${className.substr(3)}; }`;
        }

        // 边框各方向颜色规则
        else if (className.startsWith('btc-')) {
            return `{border-top-color: #${className.substr(4)}; }`;
        } else if (className.startsWith('brc-')) {
            return `{ border-right-color: #${className.substr(4)}; }`;
        } else if (className.startsWith('bbc-')) {
            return `{ border-bottom-color: #${className.substr(4)}; }`;
        } else if (className.startsWith('blc-')) {
            return `{ border-left-color: #${className.substr(4)}; }`;
        }
        return ''; // 如果没有匹配的规则, 返回空字符串
    }
    ruleForSpacingClassName(className) {
        // 全方向的外边距规则
        if (className.startsWith('m-')) {
            const value = this.appendUnit(className.substr(2));
            return `{ margin: ${value}; }`;
        }

        // 全方向的内边距规则
        else if (className.startsWith('p-')) {
            const value = this.appendUnit(className.substr(2));
            return `{ padding: ${value} }`;
        }

        // 各方向的外边距和内边距规则
        const marginPaddingRegex = /^(m|p)-(t|b|l|r)-(\d+)$/;
        const matched = className.match(marginPaddingRegex);
        if (matched) {
            const property = matched[1] === 'm' ? 'margin' : 'padding';
            const direction = {
                t: 'top',
                b: 'bottom',
                l: 'left',
                r: 'right'
            }[matched[2]];
            const value = this.appendUnit(matched[3]);;
            return `{ ${property}-${direction}: ${value}; }`;
        }

        return ''; // 如果没有匹配的规则, 返回空字符串
    }
    ruleForSizeClassName(className) {
        // 宽度规则
        if (className.startsWith('w-')) {
            const value = this.appendUnit(className.substr(2));
            if (value.endsWith('%')) {
                return `{ width: ${value}; }`;
            } else {
                return `{ width: ${value}; }`;
            }
        }

        // 高度规则
        else if (className.startsWith('h-')) {
            const value = this.appendUnit(className.substr(2));
            if (value.endsWith('%')) {
                return `{ height: ${value}; }`;
            } else {
                return `{ height: ${value}; }`;
            }
        }

        return ''; // 如果没有匹配的规则, 返回空字符串
    }

    ruleForFontClassName(className) {
        console.log(className)
        const rules = {
            'fs-': 'font-size',
            'fw-': 'font-weight',
            'td-': 'text-decoration',
            'ta-': 'text-align',
            'lh-': 'line-height',
            'ls-': 'letter-spacing',
            'ff-': 'font-family'
        };

        for (const prefix in rules) {

            if (className.startsWith(prefix)) {
                const value = this.appendUnit(className.substr(prefix.length));
                return `{ ${rules[prefix]}: ${value}; }`;
            }
        }
        return ''; // 如果没有匹配的规则, 返回空字符串
    }
    ruleForFlexClassName(className) {
        const flexRules = {
            'd-flex': 'display: flex;',
            'd-inline-flex': 'display: inline-flex;',
            'fd-row': 'flex-direction: row;',
            'fd-row-reverse': 'flex-direction: row-reverse;',
            'fd-column': 'flex-direction: column;',
            'fd-column-reverse': 'flex-direction: column-reverse;',
            'fw-wrap': 'flex-wrap: wrap;',
            'fw-nowrap': 'flex-wrap: nowrap;',
            'fw-wrap-reverse': 'flex-wrap: wrap-reverse;',
            'jc-start': 'justify-content: flex-start;',
            'jc-end': 'justify-content: flex-end;',
            'jc-center': 'justify-content: center;',
            'jc-between': 'justify-content: space-between;',
            'jc-around': 'justify-content: space-around;',
            'jc-evenly': 'justify-content: space-evenly;',
            'ai-start': 'align-items: flex-start;',
            'ai-end': 'align-items: flex-end;',
            'ai-center': 'align-items: center;',
            'ai-baseline': 'align-items: baseline;',
            'ai-stretch': 'align-items: stretch;',
            'ac-start': 'align-content: flex-start;',
            'ac-end': 'align-content: flex-end;',
            'ac-center': 'align-content: center;',
            'ac-between': 'align-content: space-between;',
            'ac-around': 'align-content: space-around;',
            'ac-stretch': 'align-content: stretch;'
        };

        if (flexRules[className]) {
            return `{ ${flexRules[className]} }`;
        }

        return ''; // 如果没有匹配的规则, 返回空字符串
    }
    ruleForBorderClassName(className) {
        const borderPrefixes = {
            'bw-': 'border-width',
            'bs-': 'border-style',
            'bc-': 'border-color',
            'bt-': 'border-top',
            'br-': 'border-right',
            'bb-': 'border-bottom',
            'bl-': 'border-left'
        };

        // 边框样式映射（可根据需要扩展）
        const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'];

        for (const prefix in borderPrefixes) {
            if (className.startsWith(prefix)) {
                const value = className.substr(prefix.length);

                // 如果是边框样式，特别处理
                if (prefix === 'bs-' && borderStyles.includes(value)) {
                    return `{ ${borderPrefixes[prefix]}: ${value}; }`;
                }

                // 如果是颜色，则使用'#'前缀
                if (prefix.startsWith('bc') || prefix.startsWith('btc') || prefix.startsWith('brc') || prefix.startsWith('bbc') || prefix.startsWith('blc')) {
                    return `{ ${borderPrefixes[prefix]}: #${value}; }`;
                }

                // 如果是宽度，添加'px'
                if (prefix.startsWith('bw') || prefix.startsWith('btw') || prefix.startsWith('brw') || prefix.startsWith('bbw') || prefix.startsWith('blw')) {
                    return `{ ${borderPrefixes[prefix]}: ${value}px; }`;
                }
            }
        }

        return ''; // 如果没有匹配的规则, 返回空字符串
    }

    ruleForPositionClassName(className) {
        const rules = {
            'p-relative': 'position: relative;',
            'p-absolute': 'position: absolute;',
            'p-fixed': 'position: fixed;',
            'p-sticky': 'position: sticky;',
        };

        for (const [key, rule] of Object.entries(rules)) {
            if (className.startsWith(key)) {
                return rule;
            }
        }
        return '';
    }

    ruleForCursorClassName(className) {
        const rules = {
            'c-pointer': 'cursor: pointer;',
            'c-wait': 'cursor: wait;',
            'c-text': 'cursor: text;',
            'c-move': 'cursor: move;',
            'c-not-allowed': 'cursor: not-allowed;',
            'c-crosshair': 'cursor: crosshair;',
        };
        return rules[className] || '';
    }

    ruleForOverflowClassName(className) {
        const rules = {
            'o-hidden': 'overflow: hidden;',
            'o-auto': 'overflow: auto;',
            'o-scroll': 'overflow: scroll;',
            'ox': (value) => `overflow-x: ${value};`,
            'oy': (value) => `overflow-y: ${value};`,
        };
        for (const [key, rule] of Object.entries(rules)) {
            if (className.startsWith(key)) {
                if (typeof rule === 'function') {
                    return rule(className.slice(2));
                }
                return rule;
            }
        }
        return '';
    }
    internallyClassName(className) {
        const predefinedStyles = `
    .te-ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .te-ellipsis-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    .grid-3cols {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 16px;
    }
    
    .card-shadow {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        overflow: hidden;
        transition: box-shadow 0.3s;
    }
    
    .card-shadow:hover {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    `;

        return predefinedStyles;
    }
}
export default new ClassRule()
