import React, { FC } from 'react';

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { useStyles } from '../../../shared/utils/styles';
import { ECurrency } from '../../../shared/consts/enum';

interface IProps {
    onSearch: any;
}

const TransactionFilter: FC<IProps> = ({onSearch}) => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();


  const onSubmit = (data:any) => onSearch(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.typog}>

        <Controller
            name="transactionID"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
                <TextField
                label="Transaction Id" 
                variant="outlined" 
                value={value}
                onChange={onChange}
                />
            )}
        />
          
        <Controller
            name="cardID"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
                <TextField
                label="Card Id" 
                variant="outlined" 
                value={value}
                onChange={onChange}
                />
            )}
        />

        <Controller
            name="currency"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value = '' } }) => (
                <FormControl className={classes.formControl} variant="outlined">
                <InputLabel id="currency-label">Currency</InputLabel>
                <Select
                    labelId="currency-label"
                    id="currency-outlined"
                    value={value}
                    onChange={onChange}
                    label="currency"
                >
                    <MenuItem value={ECurrency.AZN}>AZN</MenuItem>
                    <MenuItem value={ECurrency.USD}>USD</MenuItem>
                    <MenuItem value={ECurrency.EUR}>EUR</MenuItem>
                </Select>
                </FormControl>
            )}
        />


        <Button type="submit" variant="contained" color="secondary" className={classes.button} size="large">Search</Button>

    </form>
  );
}

export default TransactionFilter