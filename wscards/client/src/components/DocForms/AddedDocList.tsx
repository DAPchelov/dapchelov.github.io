import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../App'
import { observer } from 'mobx-react-lite';
import { IAddedDoc } from '../../store/NewDocController';

import { Button, Typography, Paper } from '@mui/material';

const AddedDocList: React.FC = () => {

  const store = useContext(Context);
  const navigate = useNavigate();

  const navigateCallback = (docId: string) => {
    store.newDoc.getEditableDoc(docId);
    navigate('/editdoc')
  };

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
        Добавленные документы:
      </Typography>
      {store.newDoc.addedDocs.length > 0 && store.newDoc.addedDocs.map((addedDoc: IAddedDoc) => {
        return (
          <Button key={addedDoc._id} variant='contained' sx={{ fontSize: 12, width: '100%' }} size='small' color='inherit' onClick={() => navigateCallback(addedDoc._id)}>{addedDoc.docDecNum}</Button>
        );
      })}
    </Paper>
  );
};

export default observer(AddedDocList);