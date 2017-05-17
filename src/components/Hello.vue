<template>
  <div class="layout">
    <div class='title'>{{msg}}</div>
  	<div class="nav">
  	    <div class="login-box">
  	        <div class="login-tab">
  	            <ul>
  	                <li class="tab_1" :class="{'active':checked == 0}" @click="checked = 0">账号登陆</li>
  	                <li class="tab_2" :class="{'active':checked == 1}" @click="checked = 1">手机号登陆</li>
  	            </ul>
  	        </div>
  	        <div class="login-form" v-if="checked == 0">
  	            <form id="user-login-form" class="user-login-form">
  	                <div class="userName-login" >
  	                    <div>
  	                        <input id="user-Name" class="userName" type="tel" placeholder="请输入用户名">
  	                        <!--<img  class="input-detele" src="images/input-detele.png" alt="">-->
  	                        <p id="user-Name_tipbox" class="error-prompt user-errorMsg"></p>
  	                    </div>
  	                    <div>
  	                        <input id="user-password" otype="u" class="password" type="password" placeholder="请输入密码">
  	                        <!--<img class="input-detele" src="images/input-detele.png" alt="">-->
  	                        <p id="u_tipbox" class="error-prompt password-errorMsg"></p>
  	                    </div>
  	                </div>
  	            </form>
  	        </div>
  	        <div class="login-form phone-login-form" v-if="checked == 1">
  	            <form id="phone-login-form">
  	                <div class="phone-login">
  	                    <div>
  	                        <input id="mobliePhone" class="mobliePhone" type="tel" placeholder="请输入手机号" maxlength="11">
  	                        <!--<img class="input-detele" src="images/input-detele.png" alt="">-->
  	                        <p id="mobliePhone_tipbox" class="error-prompt user-errorMsg"></p>
  	                    </div>
  	                    <div>
  	                        <input id="phone-password" otype="p" class="password" type="password" placeholder="请输入密码">
  	                        <!--<img class="input-detele" src="images/input-detele.png" alt="">-->
  	                        <p id="p_tipbox" class="error-prompt password-errorMsg"></p>
  	                    </div>
  	                </div>
  	            </form>

  	        </div>
  	        <div class="remeberUser">
  	            <input type="checkbox" class="remember-user ch"><span> 记住用户名</span>
  	            <!--<span id="forget-password">忘记密码</span>-->
  	        </div>
  	        <div class="margin-auto submit ch">立即登录</div>
  	    </div>
  	</div>

  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        checked: '0'
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin: 0;
  padding: 0;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;

}

a {
  color: #42b983;
}
.title{
  text-align: center;
  font-size: 50px;
}
.login-box{
  width: 650px;
  border: 2px solid #ddd;
  margin: 100px auto;
  padding-bottom: 100px;
  font-size:28px;
}
.login-tab{
  height: 100px;
}
.login-tab li{
  height: 100px;
  text-align: center;
  line-height: 100px;
  background: #f0f0f0;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.login-tab .tab_1{
  float: left;
  width: 320px;
}
.login-tab .tab_2{
  float: right;
  width: 328px;
  border-right:none;
}
.login-tab .active{
  z-index: 99;
  border-bottom: none;
  border-top: 3px solid #ba2102;
  color:#ba2102;
  height:100px;
  line-height: 100px;
  background: #fff;
}
.login-form{
  margin-top:100px;
  width: 80%;
  margin: 50px auto;
}
.margin-auto{
  width: 400px;
  margin:0 auto;
}
.error-prompt{
  position: absolute;
  top: 50px;
  background-position: 10px;
  font-size: 12px;
  color:red;
}
.errorMsg{
  font-size: 12px;
  color: #ba2102;
  margin-left: 10px;
}
.login-form input{
  width: 450px;
  height: 70px;
  line-height: 60px;
  border: 1px solid #ddd;
  margin-bottom: 50px;
  font-size: 28px;
  padding-left: 20px;
}
.getMsgCode{
  width: 300px!important;
  padding-left: 20px;
}
.graphics-code{
  margin-left: 5px;
}
.remeberUser{
  margin-left:70px;
}
.submit{
  width: 500px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background: #ba2102;
  color: #fff;
  margin-top: 30px;
  border-radius: 3px;
}
</style>
