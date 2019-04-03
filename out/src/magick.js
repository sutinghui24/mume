"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ImageMagick magick command wrapper
 */
const imagemagickCli = require("imagemagick-cli");
const utility_1 = require("./utility");
function svgElementToPNGFile(svgElement, pngFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const info = yield utility_1.tempOpen({ prefix: "mume-svg", suffix: ".svg" });
        yield utility_1.write(info.fd, svgElement); // write svgElement to temp .svg file
        const args = [info.path, pngFilePath];
        try {
            yield imagemagickCli.exec(`convert ${args.join(" ")}`);
        }
        catch (error) {
            throw new Error("imagemagick-cli failure\n" +
                error.toString() +
                "\n\nPlease make sure you have ImageMagick installed.");
        }
        return pngFilePath;
    });
}
exports.svgElementToPNGFile = svgElementToPNGFile;
//# sourceMappingURL=magick.js.map