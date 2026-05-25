import { Server } from "./presentation/server.js"
import { envs } from "./config/envs.js"
import { AppRoutes } from "./presentation/routers.js"



(async () => {
    main()
})()

function main() {
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes
    })

    server.start();
}