import { DynamoDB } from 'aws-sdk';

export const reorderKeys = (item: DynamoDB.DocumentClient.AttributeMap): DynamoDB.DocumentClient.AttributeMap => {
    const keys: Array<string> = ['playerId', 'timestamp'];
    let newItem: DynamoDB.DocumentClient.AttributeMap = {};
    keys.forEach(key => {
        newItem[key] = item[key];
    });
    Object.keys(item).forEach(key => {
        if (!newItem.hasOwnProperty(key)) {
            newItem[key] = item[key];
        }
    });
    return newItem;
}
