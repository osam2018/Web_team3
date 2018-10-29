
import Model from './model/Model';
import Vue from 'vue';
import axios from "axios";


declare module '*.vue' {
    import Vue from 'vue'
    export default Vue;


}




/*
참고https://forum.vuejs.org/t/extending-global-vue-properties-using-typescript/17599
 */
// 2. 보충하고자 하는 타입이 있는 파일을 지정하세요.
//    Vue의 constructor type은 types/vue.d.ts에 있습니다.
declare module 'vue/types/vue' {

    /*
    Vue.프로퍼티 처럼 접근하고자 할때 .
     */
    interface VueConstructor {
        $http:any;
    }
    /*
    this.프로퍼티 처럼 접근하고자 할때
     */
    interface Vue {

    }
}



declare global {
    interface Window {

        $globalBus:Vue;
        $model:Model;
    }

}