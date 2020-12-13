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

export default function SendMsgcomponent() {

  const classes = useStyles();
  const history = useHistory()

  const [pri_key1, setPriKey1] = useState("");
  const [pri_key2, setPriKey2] = useState("");
  const [message, setMessage] = useState("");
  const [en_message, setEnMessage] = useState("");
  const [nextbtn, setNextbtn] = useState(true);

  const handlefirstkeychange = (event) =>{
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setPriKey1(event.target.value)
   }
   
  }
  const handlesecondkeychange = (event) =>{
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
        setPriKey2(event.target.value)
   }
  }
  const handlemessagechange = (event) =>{
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
        setEnMessage(event.target.value)
   }
  }
  useEffect(() => {
    axios.post('/get_enmsg',{headers: {
      'Access-Control-Allow-Origin': '*',
    }})
      .then(res => {
        if(res.data.success === true){
          setEnMessage(res.data.msg)
        }
        else {
          alert(res.data.msg);
        }
      })
      .catch(error =>{
        console.log("error occurred on server.")
      })
}, []);
  function routeChange(path){ 
      history.push(path);
  }
  const handleSubmit = () =>{
        if (pri_key1.length === 0 || pri_key2.length === 0)
        {
          alert('Field is empty. Please enter message correctly.');
        }
        else{
          axios.post('/decrypt_msg',{headers: {
            'Access-Control-Allow-Origin': '*',
          },pri_key1:pri_key1, pri_key2:pri_key2,en_message:en_message})
          .then(res => {
            if(res.data.success === true){
                setMessage(res.data.message);
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
        <h3 className={classes.title}>Decrypt your Message</h3>
        <Grid container direction="row" justify="space-evenly" alignItems="center" >
            <Grid item xs={12} sm={4}>
                <h3 style ={{ textAlign: 'cennter', fontSize:30, color: 'darkslategray'}}>Enter your private and public key2 (n, d)</h3>
            </Grid>
            <Grid item xs={12} sm={8}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField id="outlined-basic" label="Private Key1" variant="outlined"  value={pri_key1} inputProps={{maxLength: 5}} onChange={handlefirstkeychange} />
              <TextField id="outlined-basic" label="Private Key2" variant="outlined" value={pri_key2} inputProps={{maxLength: 5}} onChange={handlesecondkeychange} />
            </form>
            </Grid>
        </Grid>
        <Grid container direction="row" justify="space-evenly" alignItems="center" >
            <Grid item xs={12} sm={4}>
                <h3 style ={{ textAlign: 'cennter', fontSize:30, color: 'darkslategray'}}>Enter Encrypted Message</h3>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container justify="flex-start">
              <TextField  placeholder="Please input your message here." variant="outlined" multiline rows={2} rowsMax={4} style={{width:'75%', marginLeft:'1%'}} value={en_message} onChange={handlemessagechange} />
              {/* onChange={(event) =>setMessage(event.target.value)} */}
              </Grid>
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
        
        <Grid container direction="row" justify="space-evenly" alignItems="center" >
            <Grid item xs={12} sm={4}>
                <h3 style ={{ textAlign: 'cennter', fontSize:30, color: 'darkslategray'}}>Here is your Decrypted Message</h3>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container justify="flex-start">
              <TextField  placeholder="You will get encrypted message here." variant="outlined" multiline rows={4} rowsMax={30} style={{width:'75%', marginLeft:'1%'}} value ={message}/>
              </Grid>
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
                  <Button disabled={nextbtn} style={{margin: 10,width:'38%',height:50,}} variant="outlined" color="primary" onClick={() => routeChange('key-generator')}>Go to KeyGen</Button>
                </Grid>
            </Grid>
        </Grid>
    </Container>
  );
}
