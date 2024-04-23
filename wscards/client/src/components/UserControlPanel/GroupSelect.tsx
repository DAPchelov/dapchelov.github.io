import ListItem from '@mui/material/ListItem';
import { observer } from 'mobx-react-lite';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

import React, { useContext, useEffect } from 'react';
import { Context } from '../App'

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