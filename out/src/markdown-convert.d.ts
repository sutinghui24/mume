/**
 * Convert Mume markdown to Githb Flavored Markdown
 */
import { CodeChunkData } from "./code-chunk-data";
export declare function markdownConvert(text: any, { projectDirectoryPath, fileDirectoryPath, protocolsWhiteListRegExp, filesCache, mathInlineDelimiters, mathBlockDelimiters, mathRenderingOnlineService, codeChunksData, graphsCache, usePandocParser, }: {
    projectDirectoryPath: string;
    fileDirectoryPath: string;
    protocolsWhiteListRegExp: RegExp;
    filesCache: {
        [key: string]: string;
    };
    mathInlineDelimiters: string[][];
    mathBlockDelimiters: string[][];
    mathRenderingOnlineService: string;
    codeChunksData: {
        [key: string]: CodeChunkData;
    };
    graphsCache: {
        [key: string]: string;
    };
    usePandocParser: boolean;
}, config: object): Promise<string>;
