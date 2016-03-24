///<reference path="ts/DynamoDBEvent.ts"/>
import RootObject = AILambda.RootObject;

export class Run {

    handle(recordImpl:RootObject) {
        console.log(recordImpl.Records);
        console.log(recordImpl.Records[0].eventID);

    }
}
