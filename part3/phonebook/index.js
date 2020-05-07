const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(morgan("tiny"));

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

const findById = (id) => {
  const matchingPerson = persons.find((person) => person.id === id);
  return matchingPerson;
};

const findByName = (name) => {
  const matchingPerson = persons.find((person) => person.name === name);
  return matchingPerson;
};

app.get("/", (req, res) => {
  res.send("<h1>Hello!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  let person = findById(id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  let body = req.body;
  let { name, number } = body;

  if (!body || !name || !number) {
    res.status(400).json({
      error: "Status Missing",
    });
  } else if (findByName(name)) {
    res.status(409).json({ error: "name must be unique" });
  }

  const person = {
    name: name,
    number: number,
    id: Math.floor(Math.random() * 500),
  };

  persons.concat(person);
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
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
