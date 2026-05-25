//路由鉴权:鉴权,项目当中路由能不能被的权限的设置(某一个路由什么条件下可以访问、什么条件下不可以访问)
import router from '@/router'
import setting from './setting'
//@ts-ignore
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
//获取用户相关的小仓库内部token数据,去判断用户是否登录成功
import useUserStore from './store/modules/user'
import pinia from './store'
//全局守卫:项目当中任意路由切换都会触发的钩子
router.beforeEach(async (to: any, from: any) => {
  document.title = `${setting.title} - ${to.meta.title}`
  nprogress.start()
  const userStore = useUserStore(pinia)
  const token = userStore.token
  const username = userStore.username
  if (token) {
    if (to.path === '/login') {
      return { path: '/' }
    } else {
      if (username) {
        return true
      } else {
        try {
          await userStore.userInfo()
          return true
        } catch (error) {
          await userStore.userLogout()
          return { path: '/login', query: { redirect: to.path } }
        }
      }
    }
  } else {
    if (to.path === '/login') {
      return true
    } else {
      return { path: '/login', query: { redirect: to.path } }
    }
  }
})
//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})

//第一个问题:任意路由切换实现进度条业务 ---nprogress
//第二个问题:路由鉴权(路由组件访问权限的设置)
//全部路由组件:登录|404|任意路由|首页|数据大屏|权限管理(三个子路由)|商品管理(四个子路由)

//用户未登录:可以访问login,其余六个路由不能访问(指向login)
//用户登录成功:不可以访问login[指向首页],其余的路由可以访问
