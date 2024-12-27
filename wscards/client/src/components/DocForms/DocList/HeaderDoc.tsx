import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Paper } from '@mui/material';

const HeaderDoc: React.FC = () => {

    return (
        <Paper elevation={2} sx={{
            display: 'flex',
            marginBottom: 1,
        }}>
            <ListItem disablePadding aria-multiline sx={{
                width: '10%',
                padding: 1,
                display: 'flex',
                justifyContent: 'flex-start',
            }}>
                <Typography sx={{
                    wordWrap: 'break-word',
                }}>
                    Обозначение
                </Typography>
            </ListItem>
            <ListItem disablePadding aria-multiline sx={{
                width: '45%',
                padding: 1,
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Typography sx={{
                    wordWrap: 'break-word',
                }}>
                    Наименование
                </Typography>
            </ListItem>
            <ListItem disablePadding aria-multiline sx={{
                width: '30%',
                padding: 1,
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Typography sx={{
                    wordWrap: 'break-word',
                }}>
                    Название изделия
                </Typography>
            </ListItem>
            <ListItem disablePadding aria-multiline sx={{
                width: '15%',
                padding: 1,
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <Typography sx={{
                    wordWrap: 'break-word',
                }}>
                    № папки
                </Typography>
            </ListItem>
        </Paper >
    );
}

export default observer(HeaderDoc);