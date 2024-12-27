import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../App'

import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Paper } from '@mui/material';
import { IEditableDoc } from '../../../store/NewDocController';

interface IDocProps {
    content: IEditableDoc,
    // checkTodo(id: ITodo['_id']): void,
}

const Doc: React.FC<IDocProps> = (props: IDocProps) => {

    const store = useContext(Context);
    const navigate = useNavigate();

    const navigateCallback = (docId: string) => {
        store.newDoc.getEditableDoc(docId);
        navigate('/editdoc')
    };

    return (
        <Paper elevation={2} sx={{
            display: 'flex',
        }}>
            <ListItem disablePadding aria-multiline sx={{
                background: 'rgba(21,101,192,0.15)',
                width: '20%',
                // minWidth: '180px',
                padding: 1,
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Typography sx={{
                    wordWrap: 'break-word',
                    width: '85%',
                }}>
                    {props.content.docDecNum}
                </Typography>
                <EditIcon fontSize='small' onClick={() => { navigateCallback(props.content._id) }} sx={{ cursor: 'pointer', width: '30px' }} />
            </ListItem>
            <ListItem sx={{
                width: '80%',
                display: 'flex',
                columnGap: 1,
                boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                    background: 'linear-gradient(270deg, rgba(21,101,192,0.15) 0%, rgba(0,0,0,0) 17%, rgba(0,0,0,0) 83%, rgba(21,101,192,0.15) 100%)'
                }
            }}>
                <Typography sx={{
                    wordWrap: 'break-word',
                    width: '45%',
                }}>
                    {props.content.docName}
                </Typography>
                <Typography sx={{
                    wordWrap: 'break-word',
                    width: '50%',
                }}>
                    {props.content.prodName}
                </Typography>
                <Typography sx={{
                    wordWrap: 'break-word',
                    width: '5%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}>
                    {props.content.folderNum}
                </Typography>
            </ListItem>
        </Paper >
    );
}

export default observer(Doc);