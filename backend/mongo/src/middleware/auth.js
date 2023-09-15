module.exports = (req, res, next) => {
  if(req.method === "POST") {
    // const {userId} = req.auth;
    console.log("AUTH POST");
  } else if (req.method === "GET") {
    console.log("AUTH GET");
  }
  next();
}