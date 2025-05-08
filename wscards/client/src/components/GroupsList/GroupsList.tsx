import React, { useContext, useEffect } from 'react';
import Group from './Group'
import { Context } from '../App'
import { observer } from 'mobx-react-lite';
import { Paper } from '@mui/material';

const GroupList: React.FC = () => {
    const store = useContext(Context);

    useEffect(() => {
        store.userController.receiveUserAllGroups();
    },[])

    return (
        <Paper sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 2,
            padding: 1,
        }}>
            {store.groupController.allUserGroups.length > 0 && store.groupController.allUserGroups
                .map(group => {
                        return (
                            <Group key={group.label} _id={group._id} users={group.users} label={group.label} ownerId={group.ownerId} cards={group.cards}/>
                        )
                })}
        </Paper>
    );
}
export default observer(GroupList);
