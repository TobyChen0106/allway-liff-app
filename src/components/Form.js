
import React, { Component } from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
import './SelectList.css'

const useStyles = ((theme) => ({
    root: {
        // '& .MuiTextField-root': {
        //     margin: theme.spacing(1),
        //     width: '25ch',
        // },
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '5.5rem'
    },
    textField: {
        margin: '5%',
        width: '90%',
    },
    formControl: {
        margin: '5%',
        width: '90%',
        marginBottom: '10%',
    },
}));

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    render() {
        const { classes } = this.props;
        return (
            <form className={classes.root} noValidate autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-placeholder-label-label">
                        {`選擇報修機器*`}
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        onChange={(e) => this.props.handleTextareaChange({ machine: e.target.value })}
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="機器 [1]">機器 [1]</MenuItem>
                        <MenuItem value="機器 [2]">機器 [2]</MenuItem>
                        <MenuItem value="機器 [3]">機器 [3]</MenuItem>
                        <MenuItem value="機器 [4]">機器 [4]</MenuItem>
                        <MenuItem value="機器 [5]">機器 [5]</MenuItem>
                        <MenuItem value="機器 [6]">機器 [6]</MenuItem>
                        <MenuItem value="機器 [7]">機器 [7]</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    className={classes.textField}
                    required
                    id="standard-required"
                    label="情況簡述"
                    onChange={(e) => this.props.handleTextareaChange({ condition: e.target.value })}
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    id="standard-required"
                    label="其他建議"
                    variant="outlined"
                    onChange={(e) => this.props.handleTextareaChange({ suggestion: e.target.value })}
                    multiline
                    rows={4}
                />
            </form>
        );
    }
}
export default withStyles(useStyles)(Form)