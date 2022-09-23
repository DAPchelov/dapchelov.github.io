import { useEffect, useState } from "react";
import InputForm from "./InputForm";
import SelectButtons from "./SelectButtons";
import ClearButton from "./ClearButton";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import Typography from '@mui/material/Typography';
import TodoList from './TodoList'


const deleteMe: string = 'deleteMe';

const Main:React.FC = () => {
  const [completed, setCompleted] = useState<boolean | undefined>(undefined);


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
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <InputForm />
        <TodoList/>
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography color="text.secondary" ml={1} sx={{ fontSize: 14 }}>
            {/* {`${taskArray.filter(task => task.complete === false).length}`.concat(" items left")} */}
          </Typography>
          <SelectButtons setCompleted={setCompleted} completed={completed} />
          <ClearButton/>
        </Paper>
      </Box>
    </Container>
  );
};

export default Main ;
