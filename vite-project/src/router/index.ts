import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoute, asyncRoute, anyRoute } from "./routes";
const router = createRouter({
    history: createWebHashHistory(),
    routes: [...constantRoute, ...asyncRoute, anyRoute],
    scrollBehavior() {
        return { left: 0, top: 0 }
    }
})
export default router