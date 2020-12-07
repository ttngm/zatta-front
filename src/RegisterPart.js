import React from 'react';
import './RegisterPart.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function RegisterPart() {
    return (
        <div className="register-part">
            <u><h1>キーワード登録</h1></u>

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <TextField id="outlined-basic" label="word" varient="outlined" />
                <Button variant="contained" color="primary">登録</Button>
            </Grid>

        </div>
    );
}

export default RegisterPart;