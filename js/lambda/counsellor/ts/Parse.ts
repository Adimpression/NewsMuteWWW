///<reference path="DynamoDBEvent.ts"/>

import RootObject = AILambda.RootObject;

export class Parse {

    parse(recordImpl:RootObject) {
        return recordImpl;
    }
}
