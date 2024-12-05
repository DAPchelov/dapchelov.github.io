import ListItem from '@mui/material/ListItem';
import { observer } from 'mobx-react-lite';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

import React, { useContext, useEffect } from 'react';
import { Context } from '../App'

const GroupSelect: React.FC = () => {

    const store = useContext(Context);
    
    useEffect(() => {
        store.setCurrentGroupId(store.getUser()._id)
        store.receiveUserAllGroups();
    },[])

    const handleGroupChange = (event: SelectChangeEvent | undefined) => {
        event && store.setCurrentGroupId(event.target.value);
        event && store.receiveGroupCards(event.target.value);
    }

    return (
        <ListItem sx={{
            margin: 0,
            padding: 0,
        }}>
            <FormControl fullWidth>
                <InputLabel>Группа</InputLabel>
                <Select
                    defaultValue={''}
                    label="Мои карточки"
                onChange={handleGroupChange}
                >
                    <MenuItem value={store.getUser()._id} key={store.getUser()._id}>Мои карточки</MenuItem>
                    {store.getAllUserGroups().length > 0 && store.getAllUserGroups()
                        .map(group => {
                            return (
                                <MenuItem value={group._id} key={group.label}>{group.label}</MenuItem>
                            )
                        })}
                </Select>
            </FormControl>
        </ListItem>
    );
}

export default observer(GroupSelect);