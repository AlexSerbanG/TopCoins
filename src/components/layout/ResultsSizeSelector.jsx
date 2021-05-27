import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import * as React from 'react';
import { ResultSizeContext } from '../contexts/ResultSizeContext';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export const ResultSizeSelector = () => {
  const classes = useStyles();
  const { resultsSize, setResultsSize } = React.useContext(ResultSizeContext);
  return (<FormControl variant="filled" className={classes.formControl}>
    <InputLabel id="demo-simple-select-filled-label">No. of coins:</InputLabel>
    <Select
      labelId="demo-simple-select-filled-label"
      id="demo-simple-select-filled"
      value={resultsSize}
      onChange={(e) => setResultsSize(e.target.value)}
    >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={50}>Fifty</MenuItem>
      <MenuItem value={100}>A hundred</MenuItem>
      <MenuItem value={5000}>All</MenuItem>
    </Select>
  </FormControl>);
}
