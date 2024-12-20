import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../App'
import { Box, Button } from '@mui/material';


const NewDocForm: React.FC = () => {
  const store = useContext(Context);

  // const onPush = (keyKode: string) => {
  //   if (keyKode === 'Enter') {
  //     store.newCard.postCard(store.getCurrentGroupId());
  //   }
  // };

  return (
    <div>
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
          <TextField sx={{ width: '80%' }}
            multiline
            id='filled-basic'
            label='Название изделия'
            variant='filled'
            color='success'
            value={store.newDoc.prodName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => store.newDoc.setProdName(event.target.value)}
          />
          <Button variant='contained' sx={{ fontSize: 12, width: '20%' }} size='large' onClick={() => store.newDoc.postDoc(store.getUser()._id)}>Отправить документ</Button>
        </Box>
      </Paper>
    </div>
  );
};

export default observer(NewDocForm);
