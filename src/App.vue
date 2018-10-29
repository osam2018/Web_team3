<template>

      <el-container id="app">
          <el-header class="app-header">
              <el-row class="app-header-row">
                  <el-col :span="12"><div class="grid-content" style="text-align: left;">
                      <h4 class="title" style="color: white" @click="handleCommand('')">통하군</h4>
                  </div></el-col>
                  <el-col :span="12"><div class="grid-content" style="text-align: right;">
                      <template v-if="!loginFlag">
                          <el-button @click="onLogin()" style="background-color: rgba(0,0,0,0); color:white">
                              로그인
                          </el-button>
                      </template>
                      <template v-else>
                          <el-dropdown trigger="click" @command="handleCommand">

                              <el-button style="background-color: rgba(0,0,0,0); color:white">
                                  <i class="el-icon-picture-outline"></i>
                                  중사 김창호
                                  <i class="el-icon-arrow-down el-icon--right"></i>
                              </el-button>

                              <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item command="login">로그아웃</el-dropdown-item>
                              	  <el-dropdown-item command="not-yet" >나의 프로필</el-dropdown-item>
                                  <el-dropdown-item command="">서비스 소개</el-dropdown-item>
                              </el-dropdown-menu>
                          </el-dropdown>
                      </template>
                  </div></el-col>
              </el-row>
          </el-header>

          <el-main id="app-main">
              <router-view/>
          </el-main>

          <el-footer class="app-footer">
              <div id="nav">
                  <el-menu
                          :default-active="activeIndex"
                          class="el-menu-demo"
                          mode="horizontal"
                          @select="handleSelect"
                          background-color="#0077B5"
                          text-color="#fff"
                          active-text-color="#E68523">
                      <el-menu-item index="report-location">위치 현황</el-menu-item>
                      <el-menu-item index="chat-list">소통의 장</el-menu-item>
                      <el-menu-item index="not-yet">근무 확인</el-menu-item>
                  </el-menu>
              </div>
          </el-footer>

      </el-container>
</template>

<style >

    h4 {
        margin-block-start: 0;
        margin-block-end: 0;
    }
    .title{
        font-size: 25px;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        position: relative;
        height: 100%;
    }

    .el-menu-item {
        width: 33.33%;
    }
    .app-header, .app-footer {
        background-color: transparent;
        color: #333;
        text-align: center;
        line-height: 40px;
        padding: 0px 0px;
    }
    .app-footer {
        background-color: #0077B5;
        position:fixed;
        bottom:0px;
        left: 0;
        width: 100%;
    }

    .app-header {
        background-color: #0077B5;
        position:fixed;
        top:0px;
        left: 0;
        padding: 0;
        width: 100%;
    }

    #app-main {
        background-color: white;
        position:fixed;
        top:60px;
        bottom:40px;
        left:0px;
        width: 100%;
        padding: 0;
    }
    .el-button{
        background-color:rgba(0,0,0,0);

    }

    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .app-header-row{
        margin:10px 0px;
    }

</style>


<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component({

    })
    export default class Home extends Vue {
        public activeIndex:string ="about";
        public loginFlag: boolean = false;

        public mounted(){
            window.$globalBus.$on("login", ()=>{
                    this.loginFlag = true;
            })

            window.$globalBus.$on("logout", ()=>{
                this.loginFlag = false;

            })

        }

        onLogin() {
            this.$router.replace("/login");
        }

        handleSelect(key:string, keyPath:string) {
            this.$router.replace("/"+key);
        }

        handleCommand(command: string) {
            if(command == "login") {
                window.$model.setLoginFlag(false);
            }
            this.$router.replace("/"+command);
        }
    }
</script>
