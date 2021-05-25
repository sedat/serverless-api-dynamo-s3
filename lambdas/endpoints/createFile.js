const Responses = require("../common/API_Responses");
const S3 = require("../common/S3");

const bucketName = process.env.bucketName;
exports.handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.fileName) {
    return Responses._400({ message: "Missing fileName from path" });
  }

  let fileName = event.pathParameters.fileName;

  const data = JSON.parse(event.body);

  const newFile = await S3.write(data, fileName, bucketName).catch((error) => {
    console.log("Error in S3 write", error);
    return null;
  });

  if (!newFile) {
    return Responses._400({ message: `Failed to write file by ${fileName}` });
  }

  return Responses._200(newFile);
};
