<template>
    <el-main>

        <h2>위치 현황</h2>
        <el-table
                :cell-style="cellStyle"
                ref="singleTable"
                highlight-current-row
                :data="tableData"
                style="width: 100%;"
                height="500px"
                @current-change="handleCurrentChange">
            <el-table-column
                    header-align="center"
                    prop="place"
                    label="장소"
                    width="80">
            </el-table-column>
            <el-table-column
                    header-align="center"
                    label="용사">
                <template slot-scope="scope">
                    <div class="wrap-card">
                        <transition-group name="list" tag="div" class="layout-card">
                            <div v-for="sol in scope.row.sol" :key="sol.id">
                                <el-card
                                        :body-style="{ padding: '0px' }"
                                        :style="{ backgroundColor: squadColor[sol.squad]}"
                                        class="box-card">
                                    <div class="solSquad">
                                        {{sol.squad}}
                                    </div>
                                    <div class="solName">
                                        {{sol.name}}
                                    </div>
                                </el-card>
                            </div>
                        </transition-group>

                    </div>

                </template>
            </el-table-column>
            <el-table-column
                    header-align="center"
                    prop="num"
                    label="현재원"
                    width="80">
            </el-table-column>
        </el-table>
    </el-main>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class ReportLocation extends Vue {

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

        public mounted(){
            this.$refs.singleTable.setCurrentRow(this.tableData[1]);
            this.tableData.forEach((row:any)=>{
                row.sol.forEach((sol:any, index:number)=>{
                    sol.id=index;
                })
            });
            this.tableData[1].sol.forEach((sol:any, index:number)=>{
                sol.id=index-1;
            });
            console.log(this.tableData);
        }

        public tableData:any[] = [
            {
                place: '4생활관',
                sol: [
                    {name:"이상범",squad:"작전"},
                    {name:"김우민",squad:"측지"},
                    {name:"홍기호",squad:"중차"}
                ],
                num: 8
            }, {
                place: '통신과',
                sol: [
                    {name:"이상욱",squad:"지원"},
                    {name:"김동민",squad:"무전"},
                ],
                num: 12
            }, {
                place: 'P.X',
                sol: [
                    {name:"오영훈",squad:"종행"},
                    {name:"장민석",squad:"종행"},
                ],
                num: 2
            }, {
                place: '사지방',
                sol: [

                ],
                num: 0
            }
        ]

        handleCurrentChange(val:any, oldval:any):void {
            const len:number = val.sol.length;
            val.num++;
            val.sol.splice(0,0,{id:len,name:"손상준",squad:"지원"});
            if(oldval!=null){
                oldval.num--;
                oldval.sol.splice(0,1);
            }

        }

        cellStyle(/*{row:any,col:any,rowIndex:any,colIndex:any}*/){
            return 'text-align: center; height:80px; font-size:15px';
        }



    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .box-card{
        text-align: center;
        line-height: 25px;
        width: 60px;
        height:60px;
    }

    .solSquad{
        font-size:10px;
    }
    .solName{
        font-size:15px;
        font-weight: bold;
    }
    .wrap-card{
        overflow-x:auto;
    }
    .layout-card{
        width:500px;
        display:flex;
    }

    .list-enter-active,
    .list-leave-active,
    .list-move {
        transition: 1s all;
    }

    .list-enter {
        opacity: 0;
        transform: translateX(-50px);
    }

    .list-enter-to {
        opacity: 1;
        transform: translateX(0);
    }

    .list-leave-active {
        position: absolute;
    }

    .list-leave-to {
        opacity: 0;
        transform: translateX(-50px);
    }

</style>
