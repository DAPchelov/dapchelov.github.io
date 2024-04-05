import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { ICard } from '../../models/ICard';
import { observer } from 'mobx-react-lite';
import { FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import TodoList from '../TodoList/TodoList';

import React, { useContext, useEffect } from 'react';
import { Context } from '../App'
import { Link } from 'react-router-dom';
import { IGroup } from '../../models/IGroup';

const GroupSelect: React.FC = () => {

    const store = useContext(Context);

    useEffect(() => {
        store.ReceiveUserLoggedInGroups();
    }, [])

    const handleGroupChange = () => {}

    return (
        <ListItem>
            <FormControl fullWidth>
                <InputLabel>{store.getUser().email}</InputLabel>
                <Select
                    // value={age}
                    label="Group"
                onChange={handleGroupChange}
                >
                    {store.getLoggedInGroups().length > 0 && store.getLoggedInGroups()
                .map(group => {
                        return (
                            <MenuItem value={group.label} key={group._id}>{group.label}</MenuItem>
                        )
                })}
                    
                </Select>
            </FormControl>
        </ListItem>
    );
}

export default observer(GroupSelect);