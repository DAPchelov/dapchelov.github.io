import { useState } from "react";
import InputForm from "./InputForm";
import Todo from "./Todo";
import SelectButtons from "./SelectButtons";
import Chip from "@mui/material/Chip";
import ClearButton from "./ClearButton";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import Typography from '@mui/material/Typography';
import { type } from "@testing-library/user-event/dist/type";

interface ITask {
  id: number
  complete: boolean,
  content: string
}

const App: React.FC = () => {
  const [taskArray, setTaskArray] = useState<ITask[]>([]);
  const [completed, setCompleted] = useState<boolean | undefined>(undefined);

  const addTask = (text: string) => {
    const newTask: ITask = {
      id: taskArray.length - 1,
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

  const filterTask = (task: ITask) => {
    if (completed === undefined) {
      return true;
    }
    if (task.complete === completed) {
      return true;
    }
    return false;
  };

  return (
    <Container maxWidth="sm" sx={{
      pt: "100px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <Typography variant="h4" color="text.secondary" gutterBottom>
        TODOS
      </Typography>
      <Box sx={{ width: "100%", maxWidth: 450 }}>
        <InputForm addProp={addTask} />
        {taskArray
          .filter(task => filterTask(task))
          .map(task => {
            return (
              <Todo key={task.id} task={task} handleToggle={handleToggle} />
            );
          })}
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
          <SelectButtons setCompleted={setCompleted} />
          <ClearButton clearFinished={clearFinished} />
        </Paper>
      </Box>
    </Container>
  );
};

export type { ITask };
export { App };
