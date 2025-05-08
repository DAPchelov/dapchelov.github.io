import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../App'
import { Box, Button, Paper } from '@mui/material';
import AddedDocList from './AddedDocList';

const NewDocForm: React.FC = () => {
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
            value={store.docController.docDecNum}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.docController.setDocDecNum(event.target.value)}
          />
          <TextField sx={{ width: '50%' }}
            multiline
            id='filled-basic'
            label='Наименование'
            variant='filled'
            color='success'
            value={store.docController.docName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.docController.setDocName(event.target.value)}
          />
          <TextField sx={{ width: '20%' }}
            multiline
            id='filled-basic'
            label='Папка №'
            variant='filled'
            color='success'
            value={store.docController.folderNum}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.docController.setFolderNum(event.target.value)}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          columnGap: 1,
          padding: 0,
        }}>
          <TextField sx={{ width: '80%' }}
            multiline
            id='filled-basic'
            label='Название изделия'
            variant='filled'
            color='success'
            value={store.docController.prodName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.docController.setProdName(event.target.value)}
          />
          <Button variant='contained' sx={{ fontSize: 12, width: '20%' }} size='large' onClick={() => store.docController.postDoc(store.userController.user._id)}>Отправить документ</Button>
        </Box>
      </Paper>
      <AddedDocList/>
    </Box>
  );
};

export default observer(NewDocForm);
