const myFunction =
  ("/",
  (req, res) => {
    res.send("Hello World!");
  });

const myFunction2 =
  ("/ttech",
  (req, res) => {
    res.send("Tooele Tech is awesome!");
  });

module.exports = { myFunction, myFunction2 };
