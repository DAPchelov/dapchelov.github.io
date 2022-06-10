import { useState } from "react";
import InputForm from "./InputForm";
import Todo from "./Todo";
import SelectButtons from "./SelectButtons";
import Chip from '@mui/material/Chip';
import ClearButton from "./ClearButton"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';


const App = () => {

  const [taskArray, setTaskArray] = useState([]);
  const [completed, setCompleted] = useState(undefined);

  const addTask = (text) => {
    const newTask = {
      id: taskArray.length - 1,
      complete: false,
      content: text,
    }
    setTaskArray([...taskArray, newTask]);
  }

  const handleToggle = (id) => {
    setTaskArray([
      ...taskArray.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : { ...task }
      )
    ])
  }

  const clearFinished = () => {
    setTaskArray([
      ...taskArray.filter(task => task.complete === false)
    ]);
  }

  const filterTask = (task) => {
    if (completed === undefined) {
      return true;
    }
    if (task.complete === completed) {
      return true;
    }
    return false;
  }

  return (
    <Container maxWidth="sm" sx={{ pt: '100px'}}>
      <Box sx={{ width: '100%', maxWidth: 450}}>
      <InputForm addProp={addTask} />
      {taskArray.filter(task => filterTask(task)).map((task) => {
        return (
          <Todo key={task.id} task={task} handleToggle={handleToggle} />
        );
      })}
      <Paper elevation={1} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Chip label={`${taskArray.filter(task => task.complete === false).length}`.concat(" items left")} size="small" variant="outlined"/>
        <SelectButtons setCompleted={setCompleted} />
        <ClearButton clearFinished={clearFinished}/>
      </Paper>
      </Box>
      </Container>
  );
}

export default App;
