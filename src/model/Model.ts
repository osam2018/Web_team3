import Vue from "vue";

export default class Model {

    public static _instance:Model;

    private chatList: any[] = [];
    private chatDataList: any[] =[];
    private index = 5;
    private loginFlag: boolean = false;

    public static getInstance(){
        if(Model._instance==null) {
            Model._instance = new Model();
        }

        return Model._instance;
    }

    constructor(){
        this.loadChatList();
        this.loadChatDataList();
    }

    getLoginFlag(): boolean {
        return this.loginFlag;
    }

    setLoginFlag(flag: boolean) {
        console.log("@@ flag ", flag);
        this.loginFlag = flag;
        if (this.loginFlag) {
            window.$globalBus.$emit("login", true)
        }else {
            window.$globalBus.$emit("logout", false)
        }


    }

    async loadChatList(){
        let result  = await Vue.$http.get("./mockup_data/chatRoomInfo.json");
        this.chatList = result.data.list;
    }

    async loadChatDataList(){
        this.chatDataList.push([]);
        for(let i = 1; i <= this.index; i++) {
            try {
                let result = await Vue.$http.get("./mockup_data/chatData/chatData" + i + ".json");
                this.chatDataList.push(result.data.list);
            } catch(e) {
                this.chatDataList.push([]);
            }
        }
    }

    createChatRoom(chatInfo: any): any {
        this.chatDataList.push([]);
        this.chatList.push({
            id: ++this.index,
            title: chatInfo.title,
            members: chatInfo.members,
            leader: chatInfo.leader
        });
        return this.index;
    }

    getChatList(){
        return this.chatList;
    }

    getChatRoomInfo(id:string){
        return this.chatList.find(value => value.id == id);
    }

    getChatData(id:string) {
        return this.chatDataList[parseInt(id)];
    }

}