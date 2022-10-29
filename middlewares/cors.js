import Cors from "cors";

export const cors = Cors({
  methods: ["GET", "HEAD", "PUT", "POST", "DELETE"],
});

function runCors(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default runCors;
