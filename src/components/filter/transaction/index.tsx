import React, { ChangeEvent, FC, useState } from "react";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useStyles } from "../../../shared/utils/styles";
import { ECurrency } from "../../../shared/consts/enum";

interface IProps {
  onSearch: any;
  searchParams: any;
}

const TransactionFilter: FC<IProps> = ({ onSearch, searchParams }) => {
  const classes = useStyles();
  const { handleSubmit } = useForm();
  const [query, setQuery] = useState(searchParams);
  console.log(searchParams);

  const onSubmit = () => onSearch(query);

  const onChange = (e: ChangeEvent<any>) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.typog}>
      <TextField
        label="Transaction Id"
        name="transactionID"
        variant="outlined"
        value={query.transactionID}
        defaultValue={query.transactionID}
        onChange={onChange}
      />

      <TextField
        label="Card Id"
        name="cardId"
        variant="outlined"
        value={query.cardId}
        defaultValue={query.cardId}
        onChange={onChange}
      />

      <TextField
        name="amount"
        label="Amount"
        variant="outlined"
        defaultValue={query.amount}
        onChange={onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel id="currency-label">Currency</InputLabel>
        <Select
          labelId="currency-label"
          id="currency-outlined"
          name="currency"
          value={query.currency}
          defaultValue={query.currency}
          onChange={onChange}
          label="currency"
        >
          <MenuItem value={ECurrency.AZN}>AZN</MenuItem>
          <MenuItem value={ECurrency.USD}>USD</MenuItem>
          <MenuItem value={ECurrency.EUR}>EUR</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        className={classes.button}
        size="large"
      >
        Search
      </Button>
    </form>
  );
};

export default TransactionFilter;
