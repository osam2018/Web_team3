<template>
    <el-main>
        <div id="wrap-content">
            <h1>통하군</h1>
            <h3>간부, 병사 간 원활한 소통을 위해</h3>
            <p>통하군은 간부와 병사 사이의 효율적이고 <br/>원활한 소통을 위한 <b>다양한 기능</b>을 제공합니다.</p>
            <h4>1. 위치 현황 보고</h4>
            <ul>
                <li>병사는 간단하게 자신이 있는 장소를 클릭함으로서 자신의 위치를 보고할 수 있습니다.</li>
                <li>위치를 보고 하게 되면 각 장소의 현재원이 자동으로 최신화됩니다.</li>
                <li>UI 상에서 자신의 위치현황판이 해당 장소에 해당하는 칸으로 들어갑니다.</li>
            </ul>
            <h4>2. 소통의 장</h4>
            <ul>
                <li>병사는 간부의 승인 하 일과, 훈련, 출타 시에 사용하는 소통의 방을 개설할 수 있습니다.</li>
                <li>소통방 추가를 하면 제목, 담당 간부, 함께할 전우를 선택할 수 있습니다. </li>
                <li>소통방 개설을 신청하면 담당 간부에게 보고 알림이 전송되고 승인 시 소통방을 개설할 수 있습니다.</li>
            </ul>
            <h4>3. 근무 확인(미구현)</h4>
            <ul>
                <li>병사는 자신의 경계 근무가 언제 있는지 확인할 수 있습니다.</li>
                <li>경계 근무를 확인하면 자동으로 간부가 가진 경계 작전 명령서에 기록이 남습니다.</li>
                <li>자신의 근무 시간에 대한 알람을 설정할 수도 있습니다.</li>
            </ul>
        </div>
    </el-main>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class CreateChatRoom extends Vue {

    }
</script>

<style scoped>
    .el-main{
        text-align: left;
        overflow-y:auto;
        /*width:*/
    }

    h1{
        margin: 10px 0px;
    }
    h3{
        margin: 10px 0px;
    }
    h4{
        margin: 20px 0px 5px 0px;
    }
    ul{
        margin: 0px;
    }
    li{
        margin: 5px 0px;
        word-break: keep-all;
    }
    #wrap-content{
        /*overflow-*/
    }
</style>