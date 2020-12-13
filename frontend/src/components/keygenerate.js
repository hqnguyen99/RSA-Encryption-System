import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '35ch',
    },
  },
  title:{
    textAlign: "center",
    color: "rebeccapurple",
    textShadow: "1px 1px 2px #6464645e",
    fontSize:45,
    backgroundColor: "darkgray",
    borderRadius:27,
    padding:12
},
}));

export default function Keygen() {

  const classes = useStyles();
  const history = useHistory()
  const [first_prim, setFirstPrim] = useState("");
  const [second_prim, setSecondPrim] = useState("");
  
  const [pri_key1, setPriKey1] = useState("");
  const [pri_key2, setPriKey2] = useState("");

  const [pub_key1, setPubKey1] = useState("");
  const [pub_key2, setPubKey2] = useState("");
  const [nextbtn, setNextbtn] = useState(true);
  function routeChange(path){ 
      history.push(path);
  }
  const handlefirstprimchange = (event) =>{
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setFirstPrim(event.target.value)
   }
   
  }
  const handlesecondprimchange = (event) =>{
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setSecondPrim(event.target.value)
   }
   
  }
  const handleSubmit = () =>{
    if (first_prim.length === 0 || second_prim.length === 0)
    {
      alert('Field is empty. Please enter values correctly');
    }
    else if (first_prim === second_prim)
    {
      alert("These value are same. Please enter different values.");
      setFirstPrim("");
      setSecondPrim("");
    }
    else{
      axios.post('/check_prime', {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },first_num:first_prim, second_num:second_prim})
      .then(res => {
        if(res.data.success === true){
          var private_key = res.data.private_key;
          var public_key = res.data.public_key;
          setPriKey1(private_key);
          setPubKey1(public_key.split(' ')[0]);
          setPubKey2(public_key.split(' ')[1]);
          setNextbtn(false);
        }
        else {
          alert(res.data.message);
        }
      })
      .catch(error =>{
        console.log("error occurred on server.")
      })
  } 
    }
  return (
    <Container>
        <h3 className={classes.title}>Key Generator</h3>
        <Grid container direction="row" justify="space-evenly" alignItems="center" >
            <Grid item xs={12} sm={4}>
                <h3 style ={{ textAlign: 'cennter', fontSize:30, color: 'darkslategray'}}>Enter Prime Numbers</h3>
            </Grid>
            <Grid item xs={12} sm={8}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField id="outlined-basic" label="Prime Number 1" variant="outlined" onChange={handlefirstprimchange} value={first_prim} inputProps={{maxLength: 5}}/>
              <TextField id="outlined-basic" label="Prime Number 2" variant="outlined" onChange={handlesecondprimchange} value={second_prim} inputProps={{maxLength: 5}}/>
            </form>
            </Grid>
        </Grid>
        <Grid container direction="row" justify="space-evenly" alignItems="center" >
            <Grid item xs={12} sm={8}>
            </Grid>
            <Grid item xs={12} sm={4} >
              <Grid container justify="flex-start">
                <Button style={{margin: 10,width:'38%',height:50,}} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
              </Grid>
            </Grid>
        </Grid>
        <Grid container direction="row" justify="space-evenly" alignItems="center" style ={{marginTop:'12%'}}>
            <Grid item xs={12} sm={4}>
                <h3 style ={{ textAlign: 'cennter', fontSize:30, color: 'darkslategray'}}>Here is your public key(n, e)</h3>
            </Grid>
            <Grid item xs={12} sm={8}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField id="outlined-basic" label="n" variant="outlined" value={pub_key1}/>
              <TextField id="outlined-basic" label="e" variant="outlined" value={pub_key2}/>
            </form>
            </Grid>
        </Grid>
        <Grid container direction="row" justify="space-evenly" alignItems="center" >
            <Grid item xs={12} sm={4}>
                <h3 style ={{ textAlign: 'cennter', fontSize:30, color: 'darkslategray'}}>Here is your private key(d)</h3>
            </Grid>
            <Grid item xs={12} sm={8}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField id="outlined-basic" label="d" variant="outlined" value={pri_key1}/>
            </form>
            </Grid>
        </Grid>
        <Grid container direction="row" justify="space-evenly" alignItems="center" style ={{marginTop:'12%'}}>
            <Grid item xs={12} sm={6}>
              <Grid container justify="center">
                  <Button style={{margin: 10,width:'38%',height:50,}} variant="outlined" color="primary" onClick={() => routeChange('welcome')}>Return HomePage</Button>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} >
              <Grid container justify="center">
                <Button disabled={nextbtn} style={{margin: 10,width:'38%',height:50,}} variant="outlined" color="primary" onClick={() => routeChange('send-msg')}>Go to Encryptor</Button>
              </Grid>
            </Grid>
        </Grid>
    </Container>
  );
}
