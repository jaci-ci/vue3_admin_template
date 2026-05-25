<template>
  <div class="login_container">
   <el-row>
    <el-col :span="12" :xs="0"></el-col>
    <el-col :span="12" :xs="24">
      <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
        <h1>Hello</h1>
        <h2>欢迎来到硅谷甄选</h2>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" v-model="loginForm.username">

          </el-input>
        </el-form-item>
         <el-form-item prop="password">
          <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
   </el-row>
  </div>
</template>

<script setup lang="ts"> 
import {User,Lock} from '@element-plus/icons-vue'
import { reactive,ref} from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
//引入用户相关小仓库
import useUserStore from '../../store/modules/user';
//引入时间相关函数
import { getTime } from '@/utils/time';

let useStore = useUserStore()
let $router = useRouter()
//路由对象
let $route = useRoute();
let loading =ref(false)
let loginForms = ref()
let loginForm = reactive({username:'admin',password:'111111'})
//登录回调
const login = async ()=>{
  //保证全部表单校验通过再发请求
  await loginForms.value.validate()
  //加载效果：开始加载
  loading.value=true
  //点击登录按钮以后干什么
  //通知仓库发登录请求
  //请求成功->首页展示数据的地方
  //请求失败->弹窗失败信息
try{
  await useStore.userLogin(loginForm)
  //编程式导航跳转到展示数据首页
  //判断登录的时候，路由路径当中是否有query参数，有就跳query路劲，没有就跳转首页
  let redirect:any =$route.query.redirect
  // 使用replace避免留下登录页的历史记录
  $router.replace({path:redirect||'/'})
  //登录成功提示信息
  ElNotification({
    type:'success',
    message:'登录成功',
    title:`Hi,${getTime()}好`
  })
  loading.value = false
}catch(error){
  loading.value = false
  ElNotification({
    type:'error',
    message:(error as Error).message
  })
}
}

//自定义校验规则函数
const validatorUserName =(rule:any,value:any,callback:any)=>{
  //rule:为校验规则对象
  //value:为表单元素文本内容
  //函数：如果符合条件callback放行，否则弹窗错误信息
  if(value.length>=5){
    callback()
  }else{
    callback(new Error('用户名长度不能小于5位'))
  }
}
const validatorUserPassword = (rule:any,value:any,callback:any)=>{
  if(value.length>=6){
    callback()
  }else{
    callback(new Error('密码长度不能小于6位'))
  }
}
//定义表单校验需要配置对象
const rules = {
  username:[
    {trigger:'blur', validator:validatorUserName}
  ],
  password:[
    {trigger:'blur', validator:validatorUserPassword}
  ]
}

</script>

<style scoped lang="scss">
.login_container{
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form{
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1{
      color: white;
      font-size: 40px;
    }
    h2{
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }
    .login_btn{
      width: 100%;
    }
    
  }
} 

</style>