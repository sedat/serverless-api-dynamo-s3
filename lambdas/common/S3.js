const AWS = require("aws-sdk");

const S3Client = new AWS.S3();

const S3 = {
  async get(fileName, bucketName) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
    };

    let file = await S3Client.getObject(params).promise();
    if (!file) {
      throw Error(
        `There was an error getting file ${fileName} from ${bucketName}`
      );
    }
    if (fileName.slice(fileName.length - 4, fileName.length) == "json") {
      file = file.Body.toString();
    }
    return file;
  },
  async write(data, fileName, bucketName) {
    const params = {
      Bucket: bucketName,
      Body: JSON.stringify(data),
      Key: fileName,
    };

    const newFile = await S3Client.putObject(params).promise();
    if (!newFile) {
      throw Error(`There was an error writing the file`);
    }
    return newFile;
  },
};
module.exports = S3;
