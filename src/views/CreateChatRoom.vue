<template>
<div id="wrap-content">

    <p v-if="!reqChat">채팅방 개설 요청이 없습니다.</p>
    <transition name="slide-fade">
        <div v-if="reqChat">
            <div class="chatRoomTitle">혹한기 훈련 (8)</div>
            <div class="wrapColSolList">

                <div v-for="(sol, index) in solList">
                    <el-card
                            :body-style="{ padding: '0px' }"
                            class="box-card"
                            :style="{ backgroundColor: squadColor[sol.squad]}">
                        <div>
                            <div class="solSquad">
                                {{sol.squad}}
                            </div>
                            <div class="solName">
                                {{sol.name}}
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>

            <div id="wrapButton">
                <el-button @click="onReport"
                           size="medium"
                           :type="this.statusButton.type"
                           :loading="this.statusButton.status=='sending'">
                    {{this.statusButton.msg}}</el-button>
            </div>
        </div>
    </transition>
</div>


</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class CreateChatRoom extends Vue {



        public mounted(){
            this.solList.forEach((sol:any) => {
                sol.select=false;
            });
            setInterval(()=>{
                this.reqChat=true;
            },3000);
        }

        public reqChat:boolean = false;
        public squadColor:any = {
            "지원":"DarkOrchid",
            "작전":"DarkOrange",
            "측지":"Gold",
            "무전":"SkyBlue",
            "중차":"LightSteelBlue",
            "종행":"LightPink",
            "의무":"Green",
            "경차":"LightBlue"
        };

        public statusList:object[] = [
            {status:"unsend", msg:"소통방 승인", type:"primary"},
            {status:"sending", msg:"소통방 승인 중...", type:"info"},
            {status:"ready", msg:"소통방 들어가기", type: "success"}
        ];

        public statusButton:object = this.statusList[0];

        public selectSolList:string[]=[];

        public title:string ='혹한기 훈련';

        public leader:string = '중사 김창호';

        public solList:any[] =[
            {name:"이상범",squad:"작전",rank:3},
            {name:"김우민",squad:"측지",rank:2},
            {name:"홍기호",squad:"중차",rank:1},
            {name:"이상욱",squad:"지원",rank:2},
            {name:"김동민",squad:"무전",rank:3},
            {name:"오영훈",squad:"종행",rank:2},
            {name:"장민석",squad:"종행",rank:4},
            {name:"권성민",squad:"작전",rank:1},
        ];

        onCreateChatRoom():void{

            const chatData = this.exportChatRoomData(this.title,this.leader,this.solList);
            this.statusButton = this.statusList[1];
            setTimeout(()=>{
                this.statusButton = this.statusList[2];
                this.$message({
                    message:this.title + '이 생성되었습니다.',
                    type: 'success'
                });
                let id = window.$model.createChatRoom(chatData);
                this.$router.replace("/chat/" + id);
            }, 1000);
        }

        exportChatRoomData(title:any,leader:any,solList:any[]):any {
            const exportObj:any = {
                title: title,
                leader: leader,
                members: solList
            };
            solList.forEach((sol:any)=>{
                if(sol.select){
                    exportObj.members.push(sol);
                }
            });
            return exportObj;
        }

        onReport():void{
            this.statusButton = this.statusList[1];
            setTimeout(()=>{
                this.statusButton = this.statusList[2];
                this.$message({
                    message:'소통방 생성 완료!',
                    type: 'success'
                });
                this.onCreateChatRoom();
            }, 3000);
        }



    }
</script>

<style scoped>
    .wrapColSolList{
        display:flex;
        flex-wrap: wrap;
        justify-content: center;
        border: 1px solid silver;
        border-radius: 20px;
        padding: 10px 0px;
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

    .chatRoomTitle{
        margin:20px;
        font-size:20px;
    }

    #wrapButton{
        padding: 10px;
    }

    .slide-fade-enter-active {
        transition: all 0.5s ease;
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: scaleY(0);
        opacity: 0;
    }
    #wrap-content{
        text-align: center;
    }

</style>