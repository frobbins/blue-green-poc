import AWS from 'aws-sdk';
import csv from 'csv-parser';
import fs from 'fs';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function uploadData(fileName: string, tableName: string) {
    console.log(`Uploading data!!!`);
    try {
        fs.createReadStream(fileName)
            .pipe(csv())
            .on('data', async (data) => {
                let item = transformValues(data);
                let params = {
                    TableName: tableName,
                    Item: item
                };
                try {
                    await dynamodb.put(params).promise();
                } catch (err) {
                    console.error(`Failed!!!! to upload item: ${JSON.stringify(item)}, ${err}`);
                }
            })
            .on('end', () => {
                console.log(`Uploaded data from ${fileName} to ${tableName}`);
            });
    } catch (err) {
        console.error(`Failed to upload data: ${err}`);
    }
}

function transformValues(values: { [key: string]: string }) {
    let result: { [key: string]: any } = {};
    for (let key in values) {
        let value = values[key];
        if (!isNaN(+value)) {
            result[key] = +value; // convert to number if possible
        } else if (value.toLowerCase() === 'true') {
            result[key] = true;
        } else if (value.toLowerCase() === 'false') {
            result[key] = false;
        } else {
            result[key] = value;
        }
    }
    return result;
}

uploadData('golf_swing_metrics.csv', 'GolfSwingMetrics');
