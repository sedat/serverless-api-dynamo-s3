const Responses = require("../common/API_Responses");
const S3 = require("../common/S3");

const bucketName = process.env.bucketName;
exports.handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.fileName) {
    return Responses._400({ message: "Missing fileName from path" });
  }

  let fileName = event.pathParameters.fileName;

  const file = await S3.get(fileName, bucketName).catch((error) => {
    console.log("Error in S3 get", error);
    return null;
  });

  if (!file) {
    return Responses._400({ message: `Failed to get file by ${fileName}` });
  }

  return Responses._200({ file });
};
