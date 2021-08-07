const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;


const transactions = require('./data/transactions.json');
const cards = require('./data/cards.json');


app.use(cors());
app.use(express.json());


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/transactions', (req, res) => {
    const filteredTransactions = transactions.filter(card => {
        let valid = true;
        for (key in req.query) {
          console.log(key, card[key], req.query[key]);
          valid = valid && card[key] == req.query[key];
        }
        return valid;
      });
      res.send(filteredTransactions);
});

app.get('/transactions/:id', (req, res) => {
    const detail = transactions.filter((transaction) => transaction.transactionID == req.params.id);
    res.send(detail);
});

app.get('/cards', function (req, res) {
    const filteredCards = cards.filter(card => {
      let valid = true;
      for (key in req.query) {
        console.log(key, card[key], req.query[key]);
        valid = valid && card[key] == req.query[key];
      }
      return valid;
    });
    res.send(filteredCards);

});
app.get('/cards/:id', (req, res) => {
    const detail = cards.filter((transaction) => transaction.cardID == req.params.id);
    res.send(detail);
});