import "./App.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import { Box, Typography, Container } from "@mui/material";
import { grey, red, green, blue } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect, useMemo } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

function App() {
  const [text, setText] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  const [todoLeste, setTodoLeste] = useState(() => {
    const savedData = localStorage.getItem("todoLeste");
    return savedData ? JSON.parse(savedData) : [];
  });
  const doneCount = todoLeste.filter((t) => t.isDone).length;

  const notDoneCount = todoLeste.filter((t) => !t.isDone).length;

  const [showAlert, setShowAlert] = useState(false);
  const [showDoneAlert, setShowDoneAlert] = useState(false);
  const [showEditeAlert, setShowEditeAlert] = useState(false);

  // _____________________________________________________________________________________________________________

  function deletClick(id) {
    const newData = todoLeste.filter((item) => item.id !== id);
    setTodoLeste(newData);
  }

  // _____________________________________________________________________________________________________________

  function doneClick(id) {
    setTodoLeste(
      todoLeste.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
  }
  const [filter, setFilter] = useState("all");

  const content = useMemo(() => {
    return todoLeste
      .filter((lest) => {
        if (filter === "all") return true;
        if (filter === "done") return lest.isDone === true;
        if (filter === "notDone") return lest.isDone === false;
        return true;
      })
      .map((lest) => (
        <Box
          key={lest.id}
          sx={{
            bgcolor: blue[900],
            marginTop: 1.7,
            marginBottom: 1.7,
            p: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
            transition: "all .25s ease",
            "&:hover": {
              paddingTop: "25px",
              paddingBottom: "25px",
            },
          }}
        >
          <Box>
            <IconButton
              sx={{
                bgcolor: "white",
                m: 0.5,
                border: `2px solid ${blue[500]}`,
              }}
              onClick={() => {
                setOpenEdit(true);
                setEditText(lest.text);
                setEditId(lest.id);
              }}
            >
              <EditIcon sx={{ fontSize: "medium", color: blue[500] }} />
            </IconButton>

            <IconButton
              onClick={() => deletClick(lest.id)}
              sx={{ bgcolor: "white", m: 0.5, border: `2px solid ${red[500]}` }}
            >
              <DeleteOutlineIcon sx={{ fontSize: "medium", color: red[500] }} />
            </IconButton>

            <IconButton
              onClick={() => doneClick(lest.id)}
              sx={{
                bgcolor: lest.isDone ? green[300] : "white",
                m: 0.5,
                border: `2px solid ${green[700]}`,
              }}
            >
              <DoneIcon sx={{ fontSize: "medium", color: green[700] }} />
            </IconButton>
          </Box>

          <Box>
            <Typography
              sx={{ textDecoration: lest.isDone ? "line-through" : "none" }}
            >
              {lest.text}
            </Typography>
          </Box>
        </Box>
      ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoLeste, filter, openEdit, editText ]);
  // لاحظ أننا وضعنا openEdit و editText هنا لأنك تضع الـ Dialog داخل الـ map

  // 2. الحفظ التلقائي عند حدوث أي تغيير في المصفوفة
  useEffect(() => {
    localStorage.setItem("todoLeste", JSON.stringify(todoLeste));
  }, [todoLeste]);

  return (
    <>
      <Container
        maxWidth="sm"
        className="App"
        style={{ marginTop: "50px" }}
        sx={{ bgcolor: grey[300], p: 1.5 }}
      >
        {/* __________________________________________ */}
        <Box>
          <h1>مهامي</h1>
        </Box>
        {/* __________________________________________ */}
        <Box>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(e, newFilter) => {
              if (newFilter !== null) {
                setFilter(newFilter);
              }
            }}
          >
            <ToggleButton value="all">
              <Typography>all </Typography>
              <span style={{ marginLeft: "5px" }}>
                {doneCount + notDoneCount}
              </span>
            </ToggleButton>
            <ToggleButton value="done">
              <Typography>done</Typography>
              <span
                style={{
                  color: blue[900],
                  fontWeight: "700",
                  marginLeft: "5px",
                }}
              >
                {doneCount}
              </span>
            </ToggleButton>
            <ToggleButton value="notDone">
              <Typography>notDone</Typography>
              <span
                style={{
                  color: red[900],
                  fontWeight: "700",
                  marginLeft: "5px",
                }}
              >
                {notDoneCount}
              </span>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* __________________________________________ */}
        <Box>{content}</Box>

        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
          <DialogTitle>تعديل المهمة</DialogTitle>

          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              label="اسم المهمة"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>إلغاء</Button>

            <Button
              variant="contained"
              onClick={() => {
                setTodoLeste(
                  todoLeste.map((todo) =>
                    todo.id === editId ? { ...todo, text: editText } : todo,
                  ),
                );
                setShowEditeAlert(true);
                setOpenEdit(false);
              }}
            >
              حفظ
            </Button>
          </DialogActions>
        </Dialog>
        {/* __________________________________________ */}

        <Box
          sx={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => {
              if (text !== ``) {
                setTodoLeste([
                  ...todoLeste,
                  { id: Date.now(), text: text, isDone: false },
                ]);
                setText("");
                setShowAlert(false); // نخفي الخطأ لو كان ظاهر
                setShowDoneAlert(true);
              } else {
                setShowAlert(true); // نعرض الخطأ
              }
            }}
            sx={{ height: "53px", width: "35%" }}
            color="error"
            variant="contained"
          >
            <Typography>اضافة</Typography>
          </Button>

          <TextField
            id="outlined-basic"
            label="اسم المهمة"
            variant="outlined"
            sx={{ width: "60%", direction: "rtl" }}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Box>
      </Container>
      {/* __________________________________________ */}
      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error" variant="filled">
          <AlertTitle>خطأ</AlertTitle>
          لا يمكن إضافة مهمة فارغة
        </Alert>
      </Snackbar>

      <Snackbar
        open={showDoneAlert}
        autoHideDuration={2000}
        onClose={() => setShowDoneAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity="success" variant="filled">
          <AlertTitle>تم</AlertTitle>
          تمت الاضافة بنجاح
        </Alert>
      </Snackbar>

      <Snackbar
        open={showEditeAlert}
        autoHideDuration={2000}
        onClose={() => setShowEditeAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="info" variant="filled">
          <AlertTitle>تعديل</AlertTitle>
          تم التعديل بنجاح
        </Alert>
      </Snackbar>
      {/* __________________________________________ */}
    </>
  );
}

export default App;
