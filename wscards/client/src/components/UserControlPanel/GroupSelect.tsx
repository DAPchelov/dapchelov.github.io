import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { ICard } from '../../models/ICard';
import { observer } from 'mobx-react-lite';
import { FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent} from '@mui/material';
import TodoList from '../TodoList/TodoList';

import React, { useContext, useEffect } from 'react';
import { Context } from '../App'
import { Link } from 'react-router-dom';
import { IGroup } from '../../models/IGroup';

const GroupSelect: React.FC = () => {

    const store = useContext(Context);
    store.setCurrentGroupId(store.getUser()._id)

    useEffect(() => {
        store.ReceiveUserLoggedInGroups();
    }, [])

    const handleGroupChange = (event: SelectChangeEvent | undefined) => {
        event && store.setCurrentGroupId(event.target.value);
        event && store.receiveCards(event.target.value);
    }

    return (
        <ListItem>
            <FormControl fullWidth>
                <InputLabel>Groups</InputLabel>
                <Select
                    defaultValue=''
                    label="Group"
                onChange={handleGroupChange}
                >
                    <MenuItem value={store.getUser()._id} key={store.getUser()._id}>My Cards</MenuItem>
                    {store.getLoggedInGroups().length > 0 && store.getLoggedInGroups()
                        .map(group => {
                            return (
                                <MenuItem value={group._id} key={group._id}>{group.label}</MenuItem>
                            )
                        })}
                </Select>
            </FormControl>
        </ListItem>
    );
}

export default observer(GroupSelect);