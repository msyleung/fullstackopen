const express = require("express");
const app = express();

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

const findUser = (request) => {
  const id = Number(request.params.id);
  const matchingPerson = persons.find((person) => person.id === id);
  return matchingPerson;
};

app.get("/", (req, res) => {
  res.send("<h1>Hello!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  let person = findUser(req);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.get("/api/info", (req, res) => {
  let noun = persons.length === 1 ? "person" : "people";
  let date = new Date();
  res.send(`Phonebook has info on ${persons.length} ${noun}<p>${date}`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
