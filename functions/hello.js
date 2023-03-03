// domain/localhost:8888/.netlify/functions/hello

const items = [
  { id: 1, name: "john" },
  { id: 2, name: "jane" },
];

exports.handler = async function (event, contect) {
  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
