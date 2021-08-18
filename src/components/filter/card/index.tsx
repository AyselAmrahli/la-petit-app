import React, { FC } from "react";

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
import { ECurrency, EStatus } from "../../../shared/consts/enum";
import { useState } from "react";
import { ChangeEvent } from "react";

interface IProps {
  onSearch: any;
  searchParams: any;
}

const CardFilter: FC<IProps> = ({ onSearch, searchParams }) => {
  const classes = useStyles();
  const { handleSubmit } = useForm();
  const [query, setQuery] = useState(searchParams);

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
        name="cardId"
        label="Card Id"
        variant="outlined"
        value={query.cardId}
        defaultValue={query.cardId}
        onChange={onChange}
      />
      <TextField
        name="cardAccount"
        label="Card Account"
        variant="outlined"
        value={query.cardAccount}
        defaultValue={query.cardAccount}
        onChange={onChange}
      />

      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel id="currency-label">Currency</InputLabel>
        <Select
          labelId="currency-label"
          id="currency-outlined"
          value={query.currency}
          name="currency"
          onChange={onChange}
          label="currency"
        >
          <MenuItem value={ECurrency.AZN}>AZN</MenuItem>
          <MenuItem value={ECurrency.USD}>USD</MenuItem>
          <MenuItem value={ECurrency.EUR}>EUR</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status-outlined"
          name="status"
          value={query.status}
          onChange={onChange}
          label="Status"
        >
          <MenuItem value={EStatus.ACTIVE}>Active</MenuItem>
          <MenuItem value={EStatus.BLOCKED}>Blocked</MenuItem>
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

export default CardFilter;
