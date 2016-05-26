declare module AILambda {

    export interface Item {
        me:string;
        handle:string;
    }

    export interface RootObject {
        Items:Item[];
        Count:number;
        ScannedCount:number;
    }

}

