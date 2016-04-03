declare module AILambda {

    export interface Id {
        N:string;
    }

    export interface Keys {
        Id:Id;
    }

    export interface ref {
        S:string;
    }

    export interface me {
        S:string;
    }

    export interface NewImage {
        ref:ref;
        me:me;
    }
    
    export interface OldImage {
        ref:ref;
        me:me;
    }

    export interface Dynamodb {
        Keys:Keys;
        NewImage:NewImage;
        OldImage:OldImage;
        StreamViewType:string;
        SequenceNumber:string;
        SizeBytes:number;
    }

    export interface Record {
        eventID:string;
        eventVersion:string;
        dynamodb:Dynamodb;
        awsRegion:string;
        eventName:string;
        eventSourceARN:string;
        eventSource:string;
    }

    export interface RootObject {
        Records:Record[];
    }


    class RecordImpl implements Record {
        eventID:string;
        eventVersion:string;
        dynamodb:AILambda.Dynamodb;
        awsRegion:string;
        eventName:string;
        eventSourceARN:string;
        eventSource:string;
    }
}

