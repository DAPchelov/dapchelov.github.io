import React, { useContext } from 'react';
import { Context } from '../index'
import { observer } from 'mobx-react-lite';

import SelectButtons from "./SelectButtons";
import ClearButton from "./ClearButton";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ControlPanel: React.FC = () => {
    const store = useContext(Context);

    return (
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography color="text.secondary" ml={1} sx={{ fontSize: 14 }}>
            {`${store.todos.filter(task => task.isCompleted === false).length}`.concat(" items left")}
          </Typography>
          <SelectButtons />
          <ClearButton />
          <Button variant="text" sx={{fontSize: 10}} size="small" color="error" onClick={() => store.logout()}>Logout</Button>
        </Paper>
    );
}

export default observer(ControlPanel);