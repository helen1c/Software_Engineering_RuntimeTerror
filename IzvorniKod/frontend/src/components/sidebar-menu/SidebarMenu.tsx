import React, {useEffect, useState} from "react";
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {ProfileUserInfo} from "../profile/ProfileUserInfo";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 650,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export const SidebarMenu = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="MOJ PROFIL" id="{0}" />
                <Tab label="ARHIVA" id="{1}" />
                <Tab label="MOJE STAZE" id="{2}" />
                <Tab label="MOJI DOGAĐAJI" id="{3}" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <ProfileUserInfo></ProfileUserInfo>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Arhiva
            </TabPanel>
            <TabPanel value={value} index={2}>
                Moje staze
            </TabPanel>
            <TabPanel value={value} index={3}>
                Moji događaji
            </TabPanel>
        </div>
    );
}