import logo from "./logo.svg";
import "./App.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import { Box, Typography, Container  } from "@mui/material";
import { grey, red , green , blue} from "@mui/material/colors";
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

function App() {

  const [text , setText] = useState('')

  const [todoLeste , setTodoLeste] = useState([]);

  const content = todoLeste.map(lest=>{
    return(
      <>
        <Box  sx={{bgcolor: blue[900] , m:0.5 , p: 1.5 , display:'flex' , justifyContent:'space-between' , alignItems:'center' , color:'white'  }}>
          <Box>
            <IconButton sx={{bgcolor: "white"  , m:0.5 , border: `2px solid ${blue[500]}` , '&:hover':{
              bgcolor:blue[200]
            } }}>
              <EditIcon sx={{fontSize:'medium' , color:blue[500] }} />
            </IconButton>
            <IconButton sx={{bgcolor:"white" , m:0.5 , border: `2px solid ${red[500]}`  ,'&:hover':{
              bgcolor:red[200]
            }  }}>
              <DeleteOutlineIcon sx={{fontSize:'medium' , color:red[500] }} />
            </IconButton>
            <IconButton sx={{bgcolor:"white" , m:0.5 , border: `2px solid ${green[700]}` , '&:hover':{
              bgcolor:green[200]
            }  }}>
              <DoneIcon sx={{fontSize:'medium' , color:green[700] }} />
            </IconButton>
          </Box>

          <Box>
            <Typography>{lest.text}</Typography>
          </Box>
        </Box>
      </>
    )
  })

  return (
    <Container maxWidth="sm" className="App" style={{marginTop:"50px"}} sx={{bgcolor: grey[300] , p:1.5 }} >
      <Box>
        <h1>مهامي</h1>
      </Box>
      <Box>
        {content}
      </Box>
      <Box sx={{marginTop:'15px' , display:'flex' , justifyContent:'space-between' }}>
        <Button onClick={()=>{
          setTodoLeste([...todoLeste,
        { id: Date.now(), text: text, isDone: false }
        ])  ;
        setText('')
        }} sx={{height:'53px' , width:'35%'}} variant="contained"><Typography>اضافة</Typography></Button>
        <TextField id="outlined-basic" label="اسم المهمة" variant="outlined" sx={{width:'60%'}} value={text} onChange={(e)=>{
          setText(e.target.value)
        }} />
      </Box>
    </Container >
  );
}

export default App;
