import {
    $,
    animSystem,
    addChild,
    bodySystem,
    colorSystem,
    clearCache,
    createContext,
    createEntity,
    polygonSystem,
    polygonRender,
    renderContext,
    spriteRender,
    textRender,
    transformSystem,
    traverse,
    schedule,
    update
} from "./modules"
import TEXTURE from "./asset/texture.png"
import SPRITESHEET from "./asset/texture.json"
import { CENTER } from "./config"
import { initLoad } from "./scenes/loadScene"

const ROOT = createEntity(["root", { t: [, CENTER] }])

schedule((delta) => {
    traverse(
        ROOT,
        (entity) => {
            animSystem(entity, delta)
            bodySystem(entity, delta)
            transformSystem(entity)
            polygonSystem(entity)
            colorSystem(entity)
        },
        (entity) => {
            polygonRender(entity)
            spriteRender(entity)
            textRender(entity)
        }
    )
    renderContext()
    clearCache()
}, 9)

createContext($<HTMLCanvasElement>("canvas"), TEXTURE, SPRITESHEET, () => {
    addChild(ROOT, initLoad())
    update()
})
