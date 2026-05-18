var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class Server {
    constructor(options) {
        this.app = express();
        const { port, public_path = 'public' } = options;
        this.port = port,
            this.publicPath = public_path;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            //* Middlewares
            //* Public Folder
            this.app.use(express.static(this.publicPath));
            // this.app.use(express.static('public/Back'))
            this.app.get(/.*/, (req, res) => {
                const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
                res.sendFile(indexPath);
                return;
            });
            this.app.listen(this.port, () => {
                console.log(`Server running on port ${this.port}`);
            });
        });
    }
}
