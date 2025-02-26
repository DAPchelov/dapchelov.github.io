import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../App'
import { Box, Button, Paper } from '@mui/material';
import AddedDocList from './AddedDocList';

const EditDocForm: React.FC = () => {
  const store = useContext(Context);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: 1,
    }}>
      <Paper sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 1,
        boxShadow: 3,
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          columnGap: 1,
          marginBottom: 1,
        }}>
          <TextField sx={{ width: '30%' }}
            multiline
            id='filled-basic'
            label='Обозначение'
            variant='filled'
            color='success'
            value={store.newDoc.docDecNum}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.newDoc.setDocDecNum(event.target.value)}
          />
          <TextField sx={{ width: '50%' }}
            multiline
            id='filled-basic'
            label='Наименование'
            variant='filled'
            color='success'
            value={store.newDoc.docName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.newDoc.setDocName(event.target.value)}
          />
          <TextField sx={{ width: '20%' }}
            multiline
            id='filled-basic'
            label='Папка №'
            variant='filled'
            color='success'
            value={store.newDoc.folderNum}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.newDoc.setFolderNum(event.target.value)}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          columnGap: 1,
          padding: 0,
        }}>
          <Button variant='contained' sx={{ fontSize: 12, width: '20%' }} size='large' color='error' onClick={() => store.newDoc.deleteDoc()}>Удалить документ</Button>
          <TextField sx={{ width: '80%' }}
            multiline
            id='filled-basic'
            label='Название изделия'
            variant='filled'
            color='success'
            value={store.newDoc.prodName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.newDoc.setProdName(event.target.value)}
          />
          <Button variant='contained' sx={{ fontSize: 12, width: '20%' }} size='large' onClick={() => store.newDoc.editDoc()}>Изменить документ</Button>
        </Box>
      </Paper>
      <AddedDocList/>
    </Box>
  );
};

export default observer(EditDocForm);
