const Responses = require("../common/API_Responses");
const Dynamo = require("../common/Dynamo");
const { withHooks } = require("../common/hooks");

const tableName = process.env.tableName;
const handler = async (event) => {
  if (!event.pathParameters.ID) {
    return Responses._400({ message: "Missing ID from path" });
  }

  let ID = event.pathParameters.ID;

  const user = await Dynamo.get(ID, tableName);

  if (!user) {
    return Responses._400({ message: "No user found!" });
  }

  return Responses._200(user);
};

exports.handler = withHooks(handler);
