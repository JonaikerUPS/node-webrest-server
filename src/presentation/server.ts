import express, { Router } from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface Options {
    port?: number
    routes: Router
    public_path?: string
}

export class Server {

    private app = express()
    private readonly port: number
    private readonly publicPath: string
    private readonly routes: Router

    constructor(options: Options) {
        const { port, public_path = 'public', routes } = options
        this.port = port,
            this.publicPath = public_path,
            this.routes = routes
    }

    async start() {

        //* Middlewares
        this.app.use(express.json()) //* Request
        this.app.use(express.urlencoded({ extended: true }))//x-www-form-url-encoded //* Form
        
        //* Public Folder 
        this.app.use(express.static(this.publicPath))
        // this.app.use(express.static('public/Back'))

        //*API Routes
        this.app.use(this.routes)

        //*SPA (Single Page Application)
        this.app.get(/.*/, (req, res) => {
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return
        })

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);

        })
    }

}
