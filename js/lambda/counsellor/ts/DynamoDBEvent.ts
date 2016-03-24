declare module AILambda {

    export interface Id {
        N:string;
    }

    export interface Keys {
        Id:Id;
    }

    export interface Message {
        S:string;
    }

    export interface Id2 {
        N:string;
    }

    export interface NewImage {
        Message:Message;
        Id:Id2;
    }

    export interface Dynamodb {
        Keys:Keys;
        NewImage:NewImage;
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

