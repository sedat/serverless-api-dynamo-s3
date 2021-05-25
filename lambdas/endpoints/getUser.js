const Responses = require('../common/API_Responses')
exports.handler = async (event) => {
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: "Missing ID from path" })
    }

    let ID = event.pathParameters.ID;

    if (data[ID]) {
        return Responses._200(data[ID])
    }

    return Responses._400({ message: "No ID in data" })
}

const data = {
    1: { name: "Anna Jones", age: 25, job: "journalist" },
    2: { name: "Chris Smith", age: 40, job: "chef" },
    3: { name: "Tom Hanks", age: 30, job: "police" }
}