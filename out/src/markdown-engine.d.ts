import { CodeChunkData } from "./code-chunk-data";
import { MarkdownEngineConfig } from "./markdown-engine-config";
export interface MarkdownEngineRenderOption {
    useRelativeFilePath: boolean;
    isForPreview: boolean;
    hideFrontMatter: boolean;
    triggeredBySave?: boolean;
    runAllCodeChunks?: boolean;
    emojiToSvg?: boolean;
    isForVSCodePreview?: boolean;
}
export interface MarkdownEngineOutput {
    html: string;
    markdown: string;
    tocHTML: string;
    yamlConfig: any;
    /**
     * imported javascript and css files
     * convert .js file to <script src='...'></script>
     * convert .css file to <link href='...'></link>
     */
    JSAndCssFiles: string[];
}
export interface HTMLTemplateOption {
    /**
     * whether is for print.
     */
    isForPrint: boolean;
    /**
     * whether is for prince export.
     */
    isForPrince: boolean;
    /**
     * if it's for phantomjs export, what is the export file type.
     * `pdf`, `jpeg`, and `png` are available.
     */
    phantomjsType?: string;
    /**
     * whether for offline use
     */
    offline: boolean;
    /**
     * whether to embed local images as base64
     */
    embedLocalImages: boolean;
    /**
     * whether to embed svg images
     */
    embedSVG?: boolean;
}
/**
 * The markdown engine that can be used to parse markdown and export files
 */
export declare class MarkdownEngine {
    /**
     * Modify markdown source, append `result` after corresponding code chunk.
     * @param codeChunkData
     * @param result
     */
    static modifySource(codeChunkData: CodeChunkData, result: string, filePath: string): Promise<string>;
    /**
     * Bind cb to MODIFY_SOURCE
     * @param cb
     */
    static onModifySource(cb: (codeChunkData: CodeChunkData, result: string, filePath: string) => Promise<string>): void;
    /**
     * markdown file path
     */
    private readonly filePath;
    private readonly fileDirectoryPath;
    private readonly projectDirectoryPath;
    private originalConfig;
    private config;
    private breakOnSingleNewLine;
    private enableTypographer;
    private enableLinkify;
    private protocolsWhiteListRegExp;
    private headings;
    private tocHTML;
    private md;
    /**
     * Dirty variable just made for VSCode preview.
     */
    private isForVSCodePreview;
    private graphsCache;
    private codeChunksData;
    private filesCache;
    /**
     * cachedHTML is the cache of html generated from the markdown file.
     */
    /**
     * Check whether the preview is in presentation mode.
     */
    isPreviewInPresentationMode: boolean;
    constructor(args: {
        /**
         * The markdown file path.
         */
        filePath: string;
        /**
         * The project directory path.
         */
        projectDirectoryPath: string;
        /**
         * Markdown Engine configuration.
         */
        config?: MarkdownEngineConfig;
    });
    /**
     * Reset config
     */
    resetConfig(): void;
    /**
     * Set default values
     */
    private initConfig;
    updateConfiguration(config: any): void;
    cacheCodeChunkResult(id: string, result: string): void;
    /**
     * Generate scripts string for preview usage.
     */
    generateScriptsForPreview(isForPresentation?: boolean, yamlConfig?: {}, isForVSCode?: boolean): string;
    /**
     * Map preview theme to prism theme.
     */
    private static AutoPrismThemeMap;
    private static AutoPrismThemeMapForPresentation;
    /**
     * Automatically pick code block theme for preview.
     */
    private getPrismTheme;
    /**
     * Generate styles string for preview usage.
     */
    generateStylesForPreview(isPresentationMode?: boolean, yamlConfig?: {}, isForVSCode?: boolean): string;
    /**
     * Generate <style> and <link> string from an array of file paths.
     * @param JSAndCssFiles
     */
    private generateJSAndCssFilesForPreview;
    /**
     * Generate html template for preview.
     */
    generateHTMLTemplateForPreview({ inputString, body, webviewScript, scripts, styles, head, config, isForVSCode, contentSecurityPolicy, }: {
        inputString?: string;
        body?: string;
        webviewScript?: string;
        scripts?: string;
        styles?: string;
        head?: string;
        config?: {};
        isForVSCode?: boolean;
        contentSecurityPolicy?: string;
    }): Promise<string>;
    /**
     * Generate HTML content
     * @param html: this is the final content you want to put.
     * @param yamlConfig: this is the front matter.
     * @param option: HTMLTemplateOption
     */
    generateHTMLTemplateForExport(html: string, yamlConfig: {}, options: HTMLTemplateOption): Promise<string>;
    /**
     * generate HTML file and open it in browser
     */
    openInBrowser({ runAllCodeChunks }: {
        runAllCodeChunks?: boolean;
    }): Promise<void>;
    /**
     *
     * @param filePath
     * @return dest if success, error if failure
     */
    htmlExport({ offline, runAllCodeChunks, }: {
        offline?: boolean;
        runAllCodeChunks?: boolean;
    }): Promise<string>;
    /**
     * Chrome (puppeteer) file export
     */
    chromeExport({ fileType, runAllCodeChunks, openFileAfterGeneration, }: {
        fileType?: string;
        runAllCodeChunks?: boolean;
        openFileAfterGeneration?: boolean;
    }): Promise<string>;
    /**
     * Phantomjs file export
     * The config could be set by front-matter.
     * Check https://github.com/marcbachmann/node-html-pdf website.
     * @param fileType the export file type
     */
    phantomjsExport({ fileType, runAllCodeChunks, openFileAfterGeneration, }: {
        fileType?: string;
        runAllCodeChunks?: boolean;
        openFileAfterGeneration?: boolean;
    }): Promise<string>;
    /**
     * prince pdf file export
     * @return dest if success, error if failure
     */
    princeExport({ runAllCodeChunks, openFileAfterGeneration, }: {
        runAllCodeChunks?: boolean;
        openFileAfterGeneration?: boolean;
    }): Promise<string>;
    private eBookDownloadImages;
    /**
     *
     *
     * @return dest if success, error if failure
     */
    eBookExport({ fileType, runAllCodeChunks, }: {
        /**
         * fileType: 'epub', 'pdf', 'mobi' or 'html'
         */
        fileType: string;
        runAllCodeChunks?: boolean;
    }): Promise<string>;
    /**
     * pandoc export
     */
    pandocExport({ runAllCodeChunks, openFileAfterGeneration, }: {
        runAllCodeChunks?: boolean;
        openFileAfterGeneration?: boolean;
    }): Promise<string>;
    /**
     * markdown(gfm) export
     */
    markdownExport({ runAllCodeChunks }: {
        runAllCodeChunks?: boolean;
    }): Promise<string>;
    /**
     * Eg
     * ---
     * export_on_save:
     *    html: true
     *    prince: true
     *    phantomjs|chrome: true  // or pdf | jpeg | png
     *    pandoc: true
     *    ebook: true      // or epub | pdf | html | mobi
     *    markdown: true
     * ---
     * @param data
     */
    private exportOnSave;
    /**
     *
     * @param filePath
     * @param relative: whether to use the path relative to filePath or not.
     */
    private resolveFilePath;
    /**
     * return this.cachedHTML
     */
    /**
     * clearCaches will clear filesCache, codeChunksData, graphsCache
     */
    clearCaches(): void;
    private frontMatterToTable;
    /**
     * process input string, skip front-matter
     * if usePandocParser. return {
     *      content: frontMatterString
     * }
     * else if display table. return {
     *      table: string of <table>...</table> generated from data
     *      content: ''
     * }
     * else return {
     *      content: replace ---\n with ```yaml
     * }
     *
     */
    private processFrontMatter;
    /**
     * Parse `html` to generate slides
     */
    private parseSlides;
    pandocRender(text: string, args: string[]): Promise<string>;
    parseMD(inputString: string, options: MarkdownEngineRenderOption): Promise<MarkdownEngineOutput>;
    /**
     * legacy method to support backwards compatibility
     */
    runCodeChunks(): Promise<any[]>;
    /**
     * legacy method to support backwards compatibility
     */
    runCodeChunk(id: string): Promise<string>;
    private generateRunOptions;
}
