// import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../App'
import { observer } from 'mobx-react-lite';

import { Button, Typography, Paper } from '@mui/material';

const CrossedDocList: React.FC = () => {

  const store = useContext(Context);
  // const navigate = useNavigate();

  return (
    <Paper sx={{
      display: 'grid',
      gap: 1,
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr));',
      padding: 1,
      boxShadow: 3,
      alignItems: 'center',
      minHeight: 30,
    }}>
      <Typography variant="subtitle2">
        Заимствованные документы:
      </Typography>
      {store.docController.crossedDocs.length > 0 && store.docController.crossedDocs.map((crossedDoc: string) => {
        return (
          <Button key={crossedDoc} variant='contained' sx={{ fontSize: 12, width: '100%' }} size='small' color='inherit' onClick={() => store.docController.removeCrossedDoc(crossedDoc)}>{crossedDoc}</Button>
        );
      })}
    </Paper>
  );
};

export default observer(CrossedDocList);