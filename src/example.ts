import { MapObject } from ".";
import exampleJson from "./example.json"
import * as fs from "fs";

async function main() {
    const jsonMapTarget = {
        username: '',
        email: '',
        contact: {
            phone: '',
            address: {
                street: '',
                zipCode: 0
            }
        },
        preferences: {
            newsletter: false,
            notifications: false
        }
    };

    const xmlMapTarget = {
        booktitle: '',
        bookauthor: '',
        bookyear: '',
    }

    const objectMapper = new MapObject()
    const mappedJsonData = await objectMapper.mapObject(exampleJson, jsonMapTarget)
    console.log(mappedJsonData)

    fs.readFile(__dirname + '/example.xml', async function read(err, data) {
        if (err) {
            throw err;
        }

        const mappedXmlData = await objectMapper.mapObject(data, xmlMapTarget)
        console.log(mappedXmlData)
    });
}

main();