import {
  Container,
  Button,
  DialogActions,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import Dialog from "../../components/common/dialog";
import useStyles from "./index.style";
import {
  downloadToExcel,
  getTodoList,
  addTodos,
  updateTodos,
  deleteTodo,
} from "../../config/utils/helper";
import List from "./list";

// const list = [
//   { title: "Task1", description: "Description of Task 1" },
//   { title: "Task2", description: "Description of Task 2" },
//   { title: "Task3", description: "Description of Task 3" },
// ];
const Todo = () => {
  const intl = useIntl();
  const classes = useStyles();
  const [openModal, setModal] = useState(false);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchList();
  }, [openModal]);

  const fetchList = () => {
    const todoList = getTodoList();
    setTodoList(todoList);
  };

  const closeModal = () => {
    setTodo({
      title: "",
      description: "",
    });
    setModal(false);
  };

  const renderTodoForm = () => {
    const formData = { ...todo };
    const isEdit = todo?.id;
    return (
      <Dialog
        title={intl.formatMessage({ id: "add-todos" })}
        open={openModal}
        onClose={() => closeModal()}
      >
        <TextField
          value={formData?.title}
          onChange={({ target }) => {
            formData.title = target.value;
            setTodo(formData);
          }}
          id="outlined-basic"
          label={intl.formatMessage({ id: "todo-item" })}
          placeholder={intl.formatMessage({ id: "todo-placeholder" })}
          fullWidth
          variant="outlined"
        />

        <TextField
          value={formData?.description}
          className={classes.textField}
          onChange={({ target }) => {
            formData.description = target.value;
            setTodo(formData);
          }}
          id="outlined-basic"
          label={intl.formatMessage({ id: "description" })}
          placeholder={intl.formatMessage({ id: "description-placeholder" })}
          fullWidth
          variant="outlined"
        />

        <DialogActions className={classes.action}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => closeModal()}
          >
            {intl.formatMessage({ id: "cancel" })}
          </Button>
          <Button
            disabled={!todo?.title?.trim() || !todo?.description?.trim()}
            variant="contained"
            color="primary"
            onClick={() => {
              if (isEdit) {
                updateTodos(todo);
                closeModal();
                return;
              }
              addTodos(todo);
              closeModal();
            }}
          >
            {isEdit
              ? intl.formatMessage({ id: "update" })
              : intl.formatMessage({ id: "add" })}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Container>
      <Container className={classes.container}>
        <Typography variant="h3" className={classes.heading}>
          {intl.formatMessage({ id: "todo-item" })}
        </Typography>
        <Grid container spacing={1}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setModal(true)}
            >
              {intl.formatMessage({ id: "add" })}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<GetAppIcon />}
              onClick={() => downloadToExcel(todoList)}
            >
              {intl.formatMessage({ id: "export-sheet" })}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DeleteIcon />}
              onClick={() => {
                deleteTodo();
                fetchList();
              }}
            >
              {intl.formatMessage({ id: "delete-all" })}
            </Button>
          </Grid>
        </Grid>
        {renderTodoForm()}
        <List
          todoList={todoList}
          onEdit={(data) => {
            setModal(true);
            setTodo(data);
          }}
          onDelete={(data) => {
            deleteTodo(data);
            fetchList();
          }}
        />
      </Container>
    </Container>
  );
};

export default Todo;
