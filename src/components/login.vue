<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 登录表单区 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <template #prefix>
              <i class="iconfont icon-custom-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <!-- <el-input class="iconfont icon-password"/> -->
          <el-input v-model="loginForm.password" type="password">
            <template #prefix>
              <i class="iconfont icon-password"></i>
            </template>
          </el-input>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'


export default {
  data() {
    return {
      //登录表单的数据表单绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //表单的验证规则对象
      loginFormRules: {
        username: [
          //验证用户名是否合法
          { required: true, message: 'Please input username', trigger: 'blur' },
          { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: 'Please input Activity password', trigger: 'blur' },
          { min: 3, max: 16, message: 'Length should be 3 to 16', trigger: 'blur' },
        ]
      },
      chengpin: {}
    }
  },
  methods: {
    //点击重置按钮，重置登录表单
    resetLoginForm() {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid);
        if (!valid) return;
        // const {data: res} = await this.$axios.post('login',this.loginForm);
        // const {data:res} = await this.$axios.post("login", {"username":"admin","password":"123456"});
        const response = await this.$axios.post("login", this.loginForm, {
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + token // token 为后端返回的登录成功后的 token 值
          }
        });
        const res = response.data;
        // console.log(res);
        if (res.meta.status !== 200) {
          ElMessage.error({
            message: '登录失败'
          })
        } else {
          ElMessage.success({
            message: '登录成功'
          })
        }
        //1. 将登录成功之后的token,保存到客户端的sessionStorage中
        //  1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
        //  1.2 token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        console.log(res);
        window.sessionStorage.setItem('token',res.data.token);
        //2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home');
      });
    },

  },
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 0%;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  // justify-content: flex-end;
  flex-direction: column;
  align-items: flex-end;
}
</style>