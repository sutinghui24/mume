/// <reference types="node" />
import * as child_process from "child_process";
export declare function escapeString(str?: string): string;
export declare function unescapeString(str?: string): string;
/**
 * Do nothing and sleep for `ms` milliseconds
 * @param ms
 */
export declare function sleep(ms: number): Promise<{}>;
export declare function parseYAML(yaml?: string): {
    [key: string]: any;
};
export declare function readFile(file: string, options?: any): Promise<string>;
export declare function writeFile(file: string, text: any, options?: any): Promise<{}>;
export declare function write(fd: number, text: string): Promise<{}>;
export declare function tempOpen(options: any): Promise<any>;
export declare function execFile(file: string, args: string[], options?: object): Promise<string>;
export declare function mkdirp(dir: string): Promise<boolean>;
/**
 * open html file in browser or open pdf file in reader ... etc
 * @param filePath
 */
export declare function openFile(filePath: string): child_process.ChildProcess;
/**
 * get "~/.mume" path
 */
export declare const extensionConfigDirectoryPath: string;
/**
 * get the directory path of this extension.
 */
export declare const extensionDirectoryPath: string;
/**
 * compile ~/.mumi/style.less and return 'css' content.
 */
export declare function getGlobalStyles(): Promise<string>;
/**
 * load ~/.mume/mermaid_config.js file.
 */
export declare function getMermaidConfig(): Promise<string>;
/**
 * load ~/.mume/phantomjs_config.js file.
 */
export declare function getPhantomjsConfig(): Promise<object>;
export declare const defaultMathjaxConfig: {
    extensions: string[];
    jax: string[];
    messageStyle: string;
    tex2jax: {
        processEnvironments: boolean;
        processEscapes: boolean;
    };
    TeX: {
        extensions: string[];
    };
    "HTML-CSS": {
        availableFonts: string[];
    };
};
/**
 * load ~/.mume/mermaid_config.js file.
 */
export declare function getMathJaxConfig(): Promise<object>;
export declare function getExtensionConfig(): Promise<object>;
/**
 * Update ~/.mume/config.json
 * @param newConfig The new config.
 */
export declare function updateExtensionConfig(newConfig?: {}): Promise<void>;
export declare function getParserConfig(): Promise<object>;
/**
 * Check whether two arrays are equal
 * @param x
 * @param y
 */
export declare function isArrayEqual(x: any, y: any): boolean;
/**
 * Add file:/// to file path
 * If it's for VSCode preview, add vscode-resource:/// to file path
 * @param filePath
 */
export declare function addFileProtocol(filePath: string, isForVSCodePreview?: boolean): string;
/**
 * Remove file:// from file path
 * @param filePath
 */
export declare function removeFileProtocol(filePath: string): string;
/**
 * style.less,
 * mathjax_config.js,
 * mermaid_config.js
 * phantomjs_config.js
 * config.json
 *
 * files
 */
export declare const configs: {
    globalStyle: string;
    mathjaxConfig: object;
    mermaidConfig: string;
    phantomjsConfig: object;
    parserConfig: object;
    /**
     * Please note that this is not necessarily MarkdownEngineConfig
     */
    config: object;
};
export { uploadImage } from "./image-uploader";
/**
 * Allow unsafed `eval` function
 * Referred from:
 *     https://github.com/atom/loophole/blob/master/src/loophole.coffee
 * @param fn
 */
export declare function allowUnsafeEval(fn: any): any;
export declare function allowUnsafeEvalAync(fn: () => Promise<any>): Promise<any>;
export declare function allowUnsafeNewFunction(fn: any): any;
export declare function allowUnsafeNewFunctionAsync(fn: () => Promise<any>): Promise<any>;
export declare function allowUnsafeEvalAndUnsafeNewFunctionAsync(fn: () => Promise<any>): Promise<any>;
export declare function Function(...args: string[]): any;
