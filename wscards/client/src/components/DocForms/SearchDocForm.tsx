import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../App'
import { Box, Button, Paper } from '@mui/material';
import SearchSelect from './SearchSelect';
import DocList from './DocList';

const SearchDocForm: React.FC = () => {
    const store = useContext(Context);
    const [searchType, setSearchType] = useState('docDecNum');
    const [searchPromt, setSearchPromt] = useState('');

    return (
            <Paper sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 1,
                boxShadow: 3,
                rowGap: 1,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'space-between',
                    justifyContent: 'center',
                    columnGap: 1,
                    marginBottom: 1,
                }}>
                    <SearchSelect setSearchType={setSearchType} />
                    <TextField sx={{ width: '100%' }}
                        multiline
                        id='filled-basic'
                        label='Запрос'
                        variant='filled'
                        color='success'
                        value={searchPromt}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchPromt(event.target.value)}
                        onKeyUp={event => {
                            // store.newDoc.searchDocs(searchType, searchPromt);
                        }}
                    />
                    <Button variant='contained' sx={{ fontSize: 12, width: '20%' }} size='large' onClick={() => store.newDoc.searchDocs(searchType, searchPromt)}>Найти документы</Button>
                </Box>
                <DocList/>
            </Paper>
    );
};

export default observer(SearchDocForm);
