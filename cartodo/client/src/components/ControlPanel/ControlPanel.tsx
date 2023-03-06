import React, { useContext } from 'react';
import { Context } from '../../index'
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';

import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import HomeControl from './HomeControl/HomeControl';
import NewCardControl from './NewCardControl/NewCardControl';


const ControlPanel: React.FC = () => {
  const store = useContext(Context);

  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 2,
        paddingRight: 2,
      }}
    >
      <Routes>
        <Route path="/" element={<HomeControl />} />
        <Route path="/newcard" element={<NewCardControl />} />
      </Routes>
      <Button variant="text" sx={{ fontSize: 10 }} size="small" color="error" onClick={() => store.logout()}>Logout</Button>
    </Paper>
  );
}

export default observer(ControlPanel);