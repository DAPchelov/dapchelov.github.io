import { useEffect, useState } from "react";
import InputForm from "./InputForm";
import SelectButtons from "./SelectButtons";
import Chip from "@mui/material/Chip";
import ClearButton from "./ClearButton";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import Typography from '@mui/material/Typography';
import TodoList from './TodoList'
import { useNavigate } from "react-router-dom";

interface ITask {
  _id?: string
  UUID: string | undefined
  id: number
  complete: boolean,
  content: string
}
interface IPropsApp {
  UUID: string | undefined;
}

const App: React.FC<IPropsApp> = (props: IPropsApp) => {
  const [taskArray, setTaskArray] = useState<ITask[]>([]);
  const [completed, setCompleted] = useState<boolean | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (!props.UUID) {
      navigate("../login", { replace: true });
    };
  })


  const addTask = (text: string) => {
    const newTask: ITask = {
      UUID: props.UUID,
      id: taskArray.length,
      complete: false,
      content: text
    };
    setTaskArray([...taskArray, newTask]);
  };

  const handleToggle = (id: number) => {
    setTaskArray([
      ...taskArray.map(task =>
        task.id === id ? { ...task, complete: !task.complete } : { ...task }
      )
    ]);
  };

  const clearFinished = () => {
    setTaskArray([...taskArray.filter(task => task.complete === false)]);
  };

  return (
    <Container maxWidth="sm" sx={{
      pt: "100px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <Typography variant="h4" color="text.secondary" gutterBottom>
        TODOS ${props.UUID}
      </Typography>
      <Box sx={{ width: "100%", maxWidth: 450 }}>
        <InputForm addProp={addTask} />
        <TodoList taskArray={taskArray} completed={completed} handleToggle={handleToggle} />
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Chip
            label={`${taskArray.filter(task => task.complete === false).length
              }`.concat(" items left")}
            size="small"
            variant="outlined"
          />
          <SelectButtons setCompleted={setCompleted} completed={completed} />
          <ClearButton clearFinished={clearFinished} />
        </Paper>
      </Box>
    </Container>
  );
};

export type { ITask };
export { App };
