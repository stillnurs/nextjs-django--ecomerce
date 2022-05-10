import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {
    List, ListItem, Container, Grid,
    Card, CardMedia, CardContent, Typography,
    Box, Button, IconButton, MenuIcon, Toolbar
} from "@mui/material";
import Link from "next/link"
import { makeStyles } from "@mui/styles"
import EShopLogo from '../images/EShopLogo';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbarDesktop: {
        backgroundColor: "#f8f8f8",
        color: "#fff",
    },
    appbarMain: {
        backgroundColor: "#675dbb",
    },
    appbarSecondary: {
        backgroundColor: "#525050",
        color: "#fff",
    },
    appbarPromotion: {
        backgroundColor: "#2d2d2d",
        color: "#fff",
        margin: theme.spacing(0, 0, 8),
        ["@media (max-width:600px)"]: {
            margin: theme.spacing(0, 0, 2),
        },
    },
    toolbarDesktop: {
        padding: "0px",
        minHeight: 30,
    },
    toolbarMain: {
        padding: "0px",
        minHeight: 60,
    },
    toolbarSecondary: {
        padding: "0px",
        minHeight: 50,
    },
    toolbarPromotion: {
        padding: "0px",
        minHeight: 50,
    },
    svg: {
        fill: "#fff",
    },
    menuList: {
        display: "flex",
        flexDirection: "row",
        padding: "0"
    },
    menuListItem: {
        padding: 0,
        paddingRight: 20,
        textTransform: "capitalize",
    },
    listItemLink: {
        fontSize: 13,
        color: "#fff",
        textDecoration: "none"
    }

}));

export default function Header({ data }) {

    const classes = useStyles();

    return (
        <nav>
            <AppBar
                position="relative"
                elevation={0}
                className={classes.appbarDesktop}
            >
                <Container maxWidth="lg">
                    <Toolbar className={classes.toolbarDesktop}></Toolbar>
                </Container>
            </AppBar>
            <AppBar position="static" elevation={0} className={classes.appbarMain}>
                <Container maxWidth="lg">
                    <Toolbar className={classes.toolbarMain}>
                        <Link href={`/`}>
                            <a>
                                <EShopLogo size={120} />
                            </a>
                        </Link>
                    </Toolbar>
                </Container>
            </AppBar>
            <AppBar
                position="relative"
                elevation={0}
                className={classes.appbarSecondary}
            >
                <Container maxWidth="lg">
                    <Toolbar className={classes.toolbarSecondary}>
                        <List className={classes.menuList}>
                            {data.map((category) => (
                                <ListItem key={category.name} className={classes.menuListItem}>
                                    <Link href={`/category/${encodeURIComponent(category.slug)}`}>
                                        <a className={classes.listItemLink}>{category.name}</a></Link>
                                </ListItem>
                            ))}
                        </List>
                    </Toolbar>
                </Container>
            </AppBar>
            <AppBar
                position="relative"
                elevation={0}
                className={classes.appbarPromotion}
            >
                <Container maxWidth="lg">
                    <Toolbar className={classes.toolbarPromotion}></Toolbar>
                </Container>
            </AppBar>
        </nav>
    );
}
