declare module AILambda {

    export interface Item {
        ref: string;
        me: string;
    }

    export interface RootObject {
        Items: Item[];
        Count: number;
        ScannedCount: number;
    }

}

