    

# JShaper

JShaper is a Typescript library that maps source data to a target JSON object using textual feature extraction. To match keys between objects, the cosine similarity of each source embedding to target embeddings is computed.

## Installation

Github: clone the repository and install the necessary dependencies

```bash
git clone https://github.com/danmxli/JShaper.git
cd JShaper
npm install
```

## Usage

```typescript
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

// {
//   email: 'alice@example.com',
//   contact: {
//     phone: '123-456-7890',
//     address: { street: 'Oak St', zipCode: 98765 }
//   },
//   preferences: { newsletter: true, notifications: true }
// }
```

## API

### `MapObject` Class

#### Constructor

```typescript
/**
 * 
 * @param {string} model - the Hugging Face model to perform text feature extraction. Default is "Xenova/all-MiniLM-L6-v2"
 * @param {number} similarityThreshold - the cosine similarity threshold. Default is 0.5
 */
new MapObject(model?: string, similarityThreshold?: number): MapObject
```

#### Public methods

```typescript
/**
 * 
 * @param source - the JSON source object.
 * @param target - the JSON target object that the source object maps to.
 * @returns {TJsonObject} the target object with populated values from source.
 */
async mapObject(source: TJsonObject, target: TJsonObject): Promise<TJsonObject>
```

#### Supported models

[Hugging Face feature extraction models](https://huggingface.co/models?pipeline_tag=feature-extraction&library=transformers.js)

## How it works

`MapObject` preserves source and target data by flattening nested objects to a depth of 1.

Keys are represented using dot-notation, which is used to unflatten the target object into its original depth.

The text embeddings of the flattened source and target keys are computed using the `feature-extraction` pipeline from the [Transformers.js](https://huggingface.co/docs/transformers.js/index) library.

By computing the cosine similarity of embeddings, it determines which key in the flattened target object is most semantically similar to each key in the flattened source object.

The value from the source object is mapped to the matching key in the target object if the similarity score is higher than the threshold.

## License

This project is licensed under the MIT License.