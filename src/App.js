import { Button, CircularProgress, Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';



function App() {

  const [user, setUser] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const loadMessages = {
    command: "load_messages",
    doctor: "mcc@gmail.com",
    patient: "ife@gmail.com"
  }

  //this function  is only called once upon landing on the page
  useEffect(() => {
    axios.get('https://eveve.herokuapp.com/api/v1/chat/', loadMessages)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    axios.post("https://eveve.herokuapp.com/api/v1/login/", user)
      .then(res => {
        setLoading(false);
        console.log(res.data);
        alert(res.data);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }

  return (
    <div className="App">
      <Grid container>
        <Grid item xs={1} md={4} />
        <Grid item xs={10} md={4} style={{ marginTop: '10%'}}>
          <h2>Eveve Login</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-number"
              label="email"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              style={{marginBottom: '20px', width: '100%'}}
              required
              value={user.email}
              onChange={e => setUser({...user, email: e.target.value})}
            />
            <TextField
              id="outlined-number"
              label="password"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              style={{marginBottom: '20px', width: '100%'}}
              required
              value={user.password}
              onChange={e => setUser({...user, password: e.target.value})}
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
              { !loading ? 'Login': <CircularProgress size={25} color="secondary" /> }
            </Button>
          </form>
          
        </Grid>
        <Grid item xs={1} md={4} />
      </Grid>
    </div>
  );
}

export default App;
