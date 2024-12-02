import ListItem from '@mui/material/ListItem';
import { observer } from 'mobx-react-lite';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

import React, { useContext, useEffect } from 'react';
import { Context } from '../App'

const GroupSelect: React.FC = () => {

    const store = useContext(Context);
    store.setCurrentGroupId(store.getUser()._id)

    useEffect(() => {
        store.receiveUserAllGroups();
    }, [])

    const handleGroupChange = (event: SelectChangeEvent | undefined) => {
        event && store.setCurrentGroupId(event.target.value);
        event && store.receiveGroupCards(event.target.value);
    }

    return (
        <ListItem>
            <FormControl fullWidth>
                <InputLabel>Group</InputLabel>
                <Select
                    defaultValue={''}
                    label="Group"
                onChange={handleGroupChange}
                >
                    <MenuItem value={store.getUser()._id} key={store.getUser()._id}>My Cards</MenuItem>
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