import { Container } from "@mui/system";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

import TodoList from './TodoList'
import InputForm from "./InputForm";
import ControlPanel from "./ControlPanel";
import ActivationTodo from "./ActivationTodo";

import { Context } from '../../src/index'
import { useContext } from "react";
import { observer } from "mobx-react-lite";

const Main: React.FC = () => {
  const store = useContext(Context);

  return (
    <Container sx={{
      maxWidth: "800px",
      pt: "100px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <Typography variant="h4" color="text.secondary" gutterBottom>
        TODOS
      </Typography>
      <Box sx={{ width: "100%" }}>
        <InputForm />
        <ControlPanel />
        <TodoList />
      </Box>
    </Container>
  );
};

export default observer(Main);
