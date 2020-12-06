import React from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'

function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="header">
            <Grid item xs={10}>
                <h1>Zatta</h1>
            </Grid>

            <Grid item xs={1}>
                <span id='user'>user1</span>
            </Grid>

            <Grid item xs={1} container alignItems="center">

                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <MenuIcon id='menu' fontSize="large" />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
                    <MenuItem onClick={handleClose}>検索設定(Fess)</MenuItem>
                    <MenuItem onClick={handleClose}><Link to="/registKeyword">キーワード登録</Link></MenuItem>
                    <MenuItem onClick={handleClose}>ログアウト</MenuItem>
                </Menu>
            </Grid>
        </div>
    );
}

export default Header;