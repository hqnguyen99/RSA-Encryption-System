import React from 'react'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
        display: "flex",
        flexDirection: 'column',
        justifyContent : "center",
    },
    title:{
        textAlign: "center",
        color: "rebeccapurple",
        textShadow: "1px 1px 2px #6464645e",
        fontSize:55,
        backgroundColor: "darkgray",
        borderRadius:27,
        padding:25
    },
    subtitle:{
        textAlign: "left",
        fontSize:35,
        color:'darkcyan',
    },
    btncontainer: {
        flex: 1,
        display: 'flex',
        justifyContent : "center",
        spacing: 4,
    }
  }));

export default function Welcomecomponent() {
    const classes = useStyles();
    const history = useHistory()
    function routeChange(path){ 
        history.push(path);
    }
    return (
        <Container maxWidth="md">
            <Box component="span" mt={10} className={classes.root}>
                <h3 className={classes.title}>Welcome to RSA Encryption</h3>
                <h5 className={classes.subtitle}>What do you want</h5>
                <Box className={classes.btncontainer} mt={2}>
                    <Button  variant="contained" color="secondary" size="large" style={{margin: 10,width:'38%',height:110,}}  onClick={() => routeChange('key-generator')}>
                        Generate Key
                    </Button>
                    <Button  variant="contained" color="primary" size="large" style={{margin: 10,width:'38%',height:110,}} onstyle={{margin: 10}} m={3} onClick={() => routeChange('send-msg')}>
                        Send Messagee
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}
