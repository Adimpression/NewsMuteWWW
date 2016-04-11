///<reference path="DynamoDBEvent.ts"/>

import RootObject = AILambda.RootObject;
import Record = AILambda.Record;

export class Parse {

    rootObject(rootObject:RootObject) {
        return rootObject;
    }
       
    record(record:Record) {
        return record;
    }
}
