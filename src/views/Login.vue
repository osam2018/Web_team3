<template>
    <el-main style="height: 100%;">
        <h2 style="text-align: center">로그인</h2>

        <el-form :model="formData" status-icon ref="formData" label-width="120px"
                 class="demo-ruleForm">
            <el-form-item label="승인코드" prop="pass">
                <el-input type="password" v-model="formData.approvalCode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="이름"  prop="checkPass">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit()">로그인</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>


<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {}
    })


    export default class Login extends Vue {
        public formData: any = {
            approvalCode: '',
            name: ''
        }

        onSubmit() {
            console.log(this.formData);
            if(this.formData.name == "김창호") {
                this.$message.success("중사 김창호로 로그인되었습니다.")
                this.$router.replace("/about");
                window.$model.setLoginFlag(true);

            }
            else {
                this.$message.error("승인코드가 올바르지 않습니다.");
                this.formData = {
                    approvalCode: '',
                    name:  this.formData.name
                }

            }

        }
    }
</script>
<style scoped>


</style>