import SvgIcon from './SvgIcon/index.vue'
//引入element-plus提供的全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Category from './Category/index.vue'
const allGloablComponent ={SvgIcon,Category}
export default{
    install(app){
        //注册项目全部的全局组件
        Object.keys(allGloablComponent).forEach(key=>{
            //注册为全局组件
            app.component(key,allGloablComponent[key])
        })
        //将element-plus提供的图标注册为全局组件
        for(const [key,component] of Object.entries(ElementPlusIconsVue)){
            app.component(key,component)
        }
    }
}