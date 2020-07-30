
import React, { Component } from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
        margin: '1rem',
        maxWidth: '100%',
    },
    formControl: {
        margin: '1rem',
        maxWidth: '100%',
        marginBottom: '2rem',
    },
    solution: {
        width: '90vw',
        margin: '5vw',
        backgroundColor: '#edf7ed'
    },
    title: {
        fontSize: 14,
    },
    content: {
        fontSize: 20,
    },
    submit: {
        width: '90vw',
        margin: '5vw',
        backgroundColor: '#fff4e5'
    },
    button:{
        width: '90vw',
        margin: '5vw',
        backgroundColor: '#0063cc',
        color:'#fff'
    }
}));

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            machine: "",
            solution: "",
            showSubmit: false,
        };
    }

    componentDidMount = () => {
        if (this.props.userMachines.length === 1) {
            this.setState({ machine: this.props.userMachines[0].machineTypeID });
        }
    }

    handleSelectMachine = (e) => {
        const m = this.props.userMachines.find(m => m.machineID === e.target.value);
        this.setState({ machine: m.machineTypeID, solution: "", showSubmit: false });
        this.props.handleTextareaChange({ machine: e.target.value })
    }

    handleSelectSituation = (e) => {
        this.props.handleTextareaChange({ condition: e.target.value });
        const s = this.props.errors.find(er => er.errorID === e.target.value);
        this.setState({ solution: s.solution, showSubmit: true });
    }

    render() {
        const { classes } = this.props;
        const machines = this.props.userMachines.map(
            (data, index) => (
                <MenuItem value={data.machineID}>{data.machineName}</MenuItem>
            )
        );
        const situation = this.props.errors.filter(e => e.machineTypeID === this.state.machine).map(
            (data, index) => (
                <MenuItem value={data.errorID}>{data.problem}</MenuItem>
            )
        );
        const solution = this.state.solution ? (
            <Card className={classes.solution}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        解決辦法
                    </Typography>
                    <Typography className={classes.content} variant="h5" component="h2">
                        {this.state.solution}
                    </Typography>
                </CardContent>
            </Card>
        ) : null;

        const submit = this.state.showSubmit ? (
            <>
                {/* <Card className={classes.submit}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            ⚠️若無法解決問題，請填寫報修單!
                        </Typography>
                    </CardContent>
                </Card> */}
                <TextField
                    className={classes.textField}
                    id="standard-required"
                    label="問題描述"
                    variant="outlined"
                    onChange={(e) => this.props.handleTextareaChange({ discription: e.target.value })}
                    multiline
                    rows={4}
                />
                <Button className={classes.button}  onClick={this.props.formOnSubmit} variant="contained" >
                    送出報修單
                </Button>
            </>
        ) : null;

        return (
            <form className={classes.root} noValidate autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-placeholder-label-label">
                        {`選擇報修機器*`}
                    </InputLabel>
                    <Select
                        defaultValue={this.props.userMachines.length === 1 ? this.props.userMachines[0].machineID : null}
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        onChange={(e) => this.handleSelectMachine(e)}
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        {machines}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-placeholder-label-label">
                        {`選擇故障情形*`}
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        onChange={(e) => this.handleSelectSituation(e)}
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        {situation}
                    </Select>
                </FormControl>
                {solution}
                {submit}
            </form>
        );
    }
}
export default withStyles(useStyles)(Form)