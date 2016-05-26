///<reference path="DynamoDBHandleItems.ts"/>

import RootObject = AILambda.RootObject;
import Item = AILambda.Item;

export class Parse {

    rootObject(rootObject:RootObject) {
        return rootObject;
    }

    item(item:Item) {
        return item;
    }
}
