import ListItem from '@mui/material/ListItem';
import { observer } from 'mobx-react-lite';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

import React, { useContext, useEffect } from 'react';
import { Context } from '../App'

const GroupSelect: React.FC = () => {

    const store = useContext(Context);
    
    useEffect(() => {
        // store.setCurrentGroupId(store.getUser()._id)
        // check if it is possible without this
        store.groupController._id = store.userController.user._id
        // console.log(store.userController.user);
        store.userController.receiveUserAllGroups();
    },[])

    const handleGroupChange = (event: SelectChangeEvent) => {
        store.groupController._id = event.target.value;
        store.groupController.receiveGroupCards(event.target.value);
    }

    return (
        <ListItem sx={{
            margin: 0,
            padding: 0,
            width: '60%',
        }}>
            <FormControl fullWidth>
                <InputLabel>Группа</InputLabel>
                <Select
                    defaultValue={''}
                    label="Мои карточки"
                onChange={handleGroupChange}
                >
                    <MenuItem value={store.userController.user._id} key={store.userController.user._id}>Мои карточки</MenuItem>
                    {store.groupController.allUserGroups.length > 0 && store.groupController.allUserGroups
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