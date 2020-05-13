require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
morgan.token("body", function (req, res) {
  return req["body"];
});
const app = express();
app.use(express.static("build"));
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(tokens.body(req, res)),
    ].join(" ");
  })
);
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const Person = require("./models/person");

// const findById = (id) => {
//   const matchingPerson = Person.find((person) => person.id === id);
//   return matchingPerson;
// };

// const findByName = (name) => {
//   const matchingPerson = Person.find((person) => person.name === name);
//   return matchingPerson;
// };

app.get("/", (req, res) => {
  res.send("<h1>Hello!</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons.map((person) => person.toJSON()));
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person.toJSON());
    })
    .catch((error) => {
      console.log(error);
      res.status(404).end();
    });
});

app.post("/api/persons", (req, res) => {
  let body = req.body;
  let { name, number } = body;

  if (!body || !name || !number) {
    res.status(400).json({
      error: "Status Missing",
    });
  }
  // else if (findByName(name)) {
  //   res.status(409).json({ error: "name must be unique" });
  // }

  const person = new Person({
    name: name,
    number: number,
    id: Math.floor(Math.random() * 500),
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson.toJSON());
  });
});

// app.delete("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   persons = Person.filter((person) => person.id !== id);

//   res.status(204).end();
// });

// app.get("/api/info", (req, res) => {
//   let noun = persons.length === 1 ? "person" : "people";
//   let date = new Date();
//   res.send(`Phonebook has info on ${persons.length} ${noun}<p>${date}`);
// });
