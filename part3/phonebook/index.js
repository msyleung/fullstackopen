require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
morgan.token("body", function (req) {
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
// app.use(logger);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const Person = require("./models/person");

app.get("/", (req, res) => {
  res.send("<h1>Hello!</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons.map((person) => person.toJSON()));
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person.toJSON());
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  let body = req.body;
  let { name, number } = body;

  if (!body || !name || !number) {
    res.status(400).json({
      error: "Status Missing",
    });
  }

  Person.findOne({ name: name })
    .then((foundPerson) => {
      if (foundPerson && foundPerson.id) {
        Person.findOneAndUpdate(
          { name: name },
          { number: number },
          {
            new: true,
          }
        )
          .then((updatedPerson) => res.json(updatedPerson.toJSON()))
          .catch((error) => next(error));
      } else {
        const person = new Person({
          name: name,
          number: number,
          id: Math.floor(Math.random() * 500),
        });

        person
          .save()
          .then((savedPerson) => {
            res.json(savedPerson.toJSON());
          })
          .catch((error) => {
            res.status(400).send({ message: error.message });
            next(error);
          });
      }
    })
    .catch((error) => next(error));
});

// update by ID
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  let { name, number } = body;

  console.log(body);

  const person = {
    name: name,
    number: number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
  })
    .then((updatedPerson) => res.json(updatedPerson.toJSON()))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/api/info", (req, res) => {
  let count;
  Person.estimatedDocumentCount({}, () => {
    count;
  }).then((response) => {
    count = response;

    let noun = count === 1 ? "person" : "people";
    let date = new Date();
    res.send(`Phonebook has info on ${count} ${noun}<p>${date}`);
  });
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);
