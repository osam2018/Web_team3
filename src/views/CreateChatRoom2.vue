<template>
    <div>
        <el-row :gutter="10" id="wrapBossSelect">
            <el-col :span="12">
                <el-input placeholder="소통방 제목" v-model="title"></el-input>
            </el-col>
            <el-col :span="12">
                <el-select v-model="leader" placeholder="간부 선택">
                    <el-option
                            v-for="(boss,index) in bosses"
                            :key="index"
                            :label="boss.label"
                            :value="boss.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row id="wrapSearchName">
            <el-col :span="24">
                <el-input placeholder="용사 검색" v-model="searchName"></el-input>
            </el-col>
        </el-row>
        <el-row id="wrapRowSolList">
            <el-col :span="24" id="wrapColSolList">
                <div v-for="(sol, index) in filteredSolList" @click="onToggleBox(index)" >
                    <div :style="[sol.select ? {filter: 'brightness(30%)'} : {}]">
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
            </el-col>
        </el-row>
        <div id="wrapTags">
            <p v-if="selectSolList.length==0">소통을 함께할 전우를 선택해주세요.</p>
            <el-tag
                    :key="tag"
                    v-for="tag in selectSolList">
                {{tag}}
            </el-tag>

        </div>
        <el-row id="wrapButton">
            <el-button @click="onReport"
                       size="medium"
                       :type="this.statusButton.type"
                       :loading="this.statusButton.status=='sending'">
                {{this.statusButton.msg}}</el-button>
        </el-row>

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
        }

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

        public statusList:object[] = [
            {status:"unsend", msg:"소통창 보고하기", type:"primary"},
            {status:"sending", msg:"보고 중...", type:"info"},
            {status:"ready", msg:"소통방 생성하기", type: "success"}
        ];

        public statusButton:object = this.statusList[0];

        public selectSolList:string[]=[];

        public title:string ='';

        public bosses:any[]=[
            {
                value: "중사 김창호",
                label: "중사 김창호"
            },
            {
                value: "중위 전우진",
                label: "중위 전우진"
            },
            {
                value: "중사 서덕현",
                label: "중사 서덕현"
            },
            {
                value: "중사 박정준",
                label: "중사 박정준"
            },
            {
                value: "원사 함형훈",
                label: "원사 함형훈"
            }
        ];

        public leader:string = '';

        public solList:any[] =[
            {name:"이상범",squad:"작전",rank:"상병"},
            {name:"김우민",squad:"측지",rank:"일병"},
            {name:"홍기호",squad:"중차",rank:"이병"},
            {name:"이상욱",squad:"지원",rank:"일병"},
            {name:"김동민",squad:"무전",rank:"상병"},
            {name:"오영훈",squad:"종행",rank:"일병"},
            {name:"장민석",squad:"종행",rank:"병장"},
            {name:"권성민",squad:"작전",rank:"이병"},
            {name:"김강민",squad:"의무",rank:"병장"},
            {name:"조형준",squad:"의무",rank:"일병"},
            {name:"이선호",squad:"경차",rank:"상병"},
            {name:"신동규",squad:"종행",rank:"이병"},
            {
                "squad": "중계",
                "rank": "이병",
                "name": "곽남기"
            },
            {
                "squad": "운용",
                "rank": "상병",
                "name": "이주용"
            },
            {
                "squad": "본부",
                "rank": "이병",
                "name": "홍승일"
            },
            {
                "squad": "운용",
                "rank": "상병",
                "name": "김민기"
            },
            {
                "squad": "전투지원",
                "rank": "일병",
                "name": "이지원"
            },
            {
                "squad": "중계",
                "rank": "이병",
                "name": "곽남기"
            },
            {
                "squad": "유선",
                "rank": "상병",
                "name": "성민석"
            },
            {
                "squad": "유선",
                "rank": "일병",
                "name": "강상수"
            },
            {
                "squad": "중계",
                "rank": "이병",
                "name": "박도형"
            },
            {
                "squad": "본부",
                "rank": "일병",
                "name": "여상환"
            }
        ]

        public searchName:string = "";

        onToggleBox(index:any):void{
            let selectSol:any=this.filteredSolList[index];
            let findIndex:number = this.selectSolList.indexOf(selectSol.name);
            selectSol.select = !selectSol.select;
            if(findIndex == -1){
                this.selectSolList.push(selectSol.name);
            }
            else{
                this.selectSolList.splice(findIndex,1);
            }
        }

        onReport():void{
            if(this.title.length == 0) {
                this.$message.error("제목이 입력되지 않았습니다.");
                return;
            }
            if(this.leader.length == 0) {
                this.$message.error("간부가 선택되지 않았습니다.");
                return;
            }

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
                members: []
            };
            exportObj.members.push({
                name:"손상준",
                rank:"일병",
                squad:"유선"
            })
            solList.forEach((sol:any)=>{
                if(sol.select){
                    exportObj.members.push(sol);
                }
            });
            return exportObj;
        }

        get filteredSolList():any[]{
            return this.solList.filter((sol:any)=>{
                return sol.name.includes(this.searchName);
            });
        }

    }
</script>

<style scoped>
    #wrapBossSelect{
        margin-top: 20px;
    }
    #wrapSearchName{
        margin-top: 10px;
    }
    #wrapRowSolList{
        overflow:scroll;
        width:100%;
        height:300px;
    }
    #wrapColSolList{
        display:flex;
        justify-content: center;
        flex-wrap: wrap;
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

    .select{
        filter: brightness(30%);
    }

    #wrapTags{
        border: 1px solid lightgrey;
        height: 80px;
        padding: 20px;
        border-radius: 20px;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        overflow-y:auto;
    }

    #wrapButton{
        padding: 10px;
        text-align: center;
    }

</style>