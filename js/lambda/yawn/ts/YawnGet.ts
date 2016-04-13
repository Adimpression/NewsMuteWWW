declare module YawnGet {

    export interface Item {
        ref:string;
        title:string;
        content:string;
        me:string;
    }

    export interface Data {
        Items:Item[];
        Count:number;
        ScannedCount:number;
    }

    export interface RootObject {
        data:Data;
        status:number;
        statusText:string;
    }
}

