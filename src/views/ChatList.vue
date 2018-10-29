<template>
    <el-main>
        <h2>소통의 장</h2>

        <el-collapse v-model="activeNames">
            <template v-for="(chat,index) in chatList">
                <el-collapse-item :title="chat.title + ' - ' + chat.leader + ' 외 ' + chat.members.length+ '명'"  :name="index">
                    <div class="member">
                        <div v-for="member in chat.members">
                            <el-card
                                    :body-style="{ padding: '0px' }"
                                    :style="{backgroundColor: squadColor[member.squad]}"
                                    class="box-card">
                                <div class="solSquad">
                                    {{member.squad}}
                                </div>
                                <div class="solName">
                                    {{member.name}}
                                </div>
                            </el-card>
                        </div>

                    </div>


                    <div class="button">
                        <el-button type="primary" class="enter" @click="confirmEnter(chat.id)" round>입 장</el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="confirmDelete(chat.id)" circle></el-button>
                    </div>
                </el-collapse-item>
            </template>
        </el-collapse>

        <el-button id="create" type="primary" icon="el-icon-warning" @click="confirmCreate()" plain>요청 확인</el-button>
    </el-main>
</template>


<style scoped>

    #create {
        position: fixed;
        bottom: 100px;
        right: 10%;
        width: 130px;
        height: 50px;
        z-index: 5;
    }

    .el-icon-plus {
        width: 20px;
    }
    .member {
        display: flex;
        flex-wrap: wrap;
    }

    .button {
        margin-top: 20px;
        text-align: center;
    }

    .enter {
        width: 40%;
    }

    .box-card{
        text-align: center;
        line-height: 32px;
        width: 83px;
        height:83px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px;
    }

    .solSquad{
        font-size:17px;
    }
    .solName{
        font-size:21px;
        font-weight: bold;
    }

</style>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {
        }
    })
    export default class ChatList extends Vue {
        public activeNames:number[] = [];
        public chatList:any[] = [];

        public squadColor:any = {
            "지원":"DarkOrchid",
            "작전":"DarkOrange",
            "측지":"Gold",
            "무전":"SkyBlue",
            "중차":"LightSteelBlue",
            "종행":"LightPink",
            "의무":"Green",
            "경차":"LightBlue",
            "유선":"LightBlue",
            "중계":"LightGreen",
            "운용":"LightGrey",
            "본부":"Silver",
            "전투지원":"White"
        };



        mounted() {
            this.chatList = window.$model.getChatList();
        }
        confirmCreate() {
            this.$router.replace("/create-chat-room");
        }

        confirmEnter(index: number) {
            this.$message({
                type: 'success',
                message: this.chatList.find(value => value.id == index).title + "에 입장하셨습니다."
            });
            this.$router.replace("/chat/"+index);
        }

        confirmDelete(id: number) {
            this.$confirm('소통방을 삭제하시겠습니까?', {
                confirmButtonText: '네',
                cancelButtonText: '아니오',
                type: 'warning'
            }).then(() => {
                let index = this.chatList.findIndex(value => value.id == id);
                this.$message({
                    type: 'success',
                    message: this.chatList[index].title + "을 삭제하였습니다."
                });
                this.chatList.splice(index, 1);
                this.activeNames = [];
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '취소하였습니다.'
                });
            });
        }


    }
</script>