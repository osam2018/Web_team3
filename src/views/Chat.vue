<template>
    <el-main class="chat-main">
        <el-container>
            <el-header id="chat-header">
                <el-row id="chat-header-row">
                    <el-col :span="8"><div class="grid-content" style="text-align: left;">
                        <el-button icon="el-icon-back" circle @click="onBack()"></el-button>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content">
                        <h4 v-if="chatRoomInfo">{{chatRoomInfo.title}}</h4>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content" style="text-align: right;">
                        <p v-if="chatRoomInfo">{{chatRoomInfo.leader}} 외 {{chatRoomInfo.members.length}}명</p>
                    </div></el-col>
                </el-row>
            </el-header>
            <el-main id="main">
                <div id="content-main">
                    <el-row id="content-row" :gutter="20">
                        <template v-for="data in chatData">
                            <template v-if="data.name != loginName">
                                <el-col :span="18"><div class="grid-content">
                                    <p class="name-left">{{data.name}}</p>
                                    <el-tag class="el-tag-left">{{data.content}}</el-tag>
                                </div></el-col>
                                <el-col :span="6"><div class="grid-content">
                                    <p class="name-right" id="ghost">.</p>
                                    <el-tag id="ghost" class="el-tag-right"></el-tag>
                                </div></el-col>
                            </template>
                            <template v-else>
                                <el-col :span="6"><div class="grid-content">
                                    <p class="name-left"></p>
                                </div></el-col>
                                <el-col :span="18"><div class="grid-content">
                                    <p class="name-right">{{data.name}}</p>
                                    <el-tag type="success" class="el-tag-right">{{data.content}}</el-tag>
                                </div></el-col>
                            </template>
                        </template>
                    </el-row>
                </div>


            </el-main>
            <el-footer class="chat-footer">
                <el-row id="chat-footer-row">
                    <el-col :span="10"><div class="textinput">
                        <el-input placeholder="Please input" v-model="textarea" @submit="onSend(textarea)">
                        </el-input>
                    </div></el-col>
                    <el-col :span="2"><div class="send">
                            <el-button :disabled="textarea==''" slot="append" icon="el-icon-check" @click="onSend(textarea)"></el-button>
                    </div></el-col>
                </el-row>
            </el-footer>
        </el-container>
    </el-main>
</template>


<style scoped>

    #chat-header {
        width: 100%;
        position: fixed;
        top: 70px;
        left: 0px;
    }

    #chat-footer-row, #chat-header-row {
        width: 100%;

    }
    #content-row {
        height: 100%;
    }

    .chat-main {
        padding-top: 50px;
        padding-bottom: 80px;
        height: 100%;
    }
    #content-main {
        height: 500px;
        overflow-y: scroll;
        padding:0px 10px;
    }

    #main {
        bottom: 80px;
        padding:0px 0px 10px 0px;
    }

    .send {
        width: 20px;
    }
    p {
        font-size: 8pt;
        margin: 2px 0px;
    }
    .el-tag-left, .name-left {
        width: 100%;
        text-align: left;
    }
    .el-tag-right, .name-right {
        width: 100%;
        text-align: right;
    }
    #ghost {
        background-color: transparent;
        border-style: hidden;
        color: transparent;
    }
    .el-button {
        padding: 5px 5px;
        height: 40px;
    }
    .el-button {
        background: #DCDFE6;
    }
    .chat-footer {
        background-color: transparent;
        padding: 0px 0px 0px 10px;
        position: fixed;
        width: 100%;
        bottom: 50px;
        left: 0;
    }
    .el-col-10 {
        width: 90%;
        height: 40px;
    }
</style>


<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {
        }
    })

    export default class Chat extends Vue {
        textarea: string = "";
        loginName: string  = "중사 김창호";
        chatData: any[] = [];
        chatRoomInfo: any = {
            id: 0,
            title: "",
            members: [],
            leader: ""
        };

        public messageList: string[]= [
            "안녕하세요",
            "충성!",
            "수고했습니다",
            "고생하십니다",
            "내일 훈련 예정입니다",
            "회의 중입니다",
            "생일 축하드립니다",
            "일과 중에는 힘들 것 같습니다",
            "즐거운 주말 보내세요",
            "네",
            "예",
            "아니요",
            "알겠습니다",
            "그렇습니다",
            "잘못들었습니다?",
            "잘못들었습니다",
            "아닙니다",
            "...",
        ];

        async mounted() {
            console.log(this.$route.params.id);
            let id = this.$route.params.id;
            this.chatData = window.$model.getChatData(id);
            this.chatRoomInfo = window.$model.getChatRoomInfo(id);
            console.log(this.chatRoomInfo);
        }

        onBack() {
            this.$router.replace("/chat-list/");
        }
        onSend(content: string) {
            this.chatData.push({
                content,
                name: this.loginName
            });
            this.textarea = "";
            let objDiv = document.getElementById("content-main");
            console.log(objDiv);

            let randomIndex = Math.floor(Math.random() * this.messageList.length);
            let randomMemberIndex = Math.floor(Math.random() * this.chatRoomInfo.members.length);
            let randomMember = this.chatRoomInfo.members[randomMember];
			
            setTimeout(()=> {
                this.chatData.push({
                    content: this.messageList[randomIndex],
                    name: this.randomMember.rank+ " " + this.randomMember.name
                });
            }, 1000);
            // objDiv.scrollTop = objDiv.scrollHeight;
        }

    }
</script>