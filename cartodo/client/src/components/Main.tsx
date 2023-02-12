import { Container } from "@mui/system";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

import CardsList from './CardsList'
import InputForm from "./InputForm";
import ControlPanel from "./ControlPanel";

import { observer } from "mobx-react-lite";

const Main: React.FC = () => {

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
        <CardsList />
      </Box>
    </Container>
  );
};

export default observer(Main);
