declare module AILambda {

    export interface Item {
        source:string;
        link:string;
        ref:string;
        title:string;
        content:string;
        me:string;
    }

    export interface RootObject {
        Items:Item[];
        Count:number;
        ScannedCount:number;
    }
}



