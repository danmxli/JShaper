import { MapObject } from ".";

/**
 * example use case of MapObject
 */
async function main() {
    const sourceObj = {
        userDetails: {
            name: 'Alice Johnson',
            emailAddress: 'alice@example.com'
        },
        phoneNumber: '123-456-7890',
        location: {
            streetName: 'Oak St',
            postalCode: 98765
        },
        settings: {
            receiveNewsletter: true,
            enableNotifications: true
        }
    };

    const targetObj = {
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

    const objectMapper = new MapObject()
    const res = await objectMapper.mapObject(sourceObj, targetObj)
    console.log(res)
}

main();