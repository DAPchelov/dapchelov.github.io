import React, { useContext, useEffect } from 'react';
import Card from '../CardsList/Card'
import { Context } from '../App'
import { observer } from 'mobx-react-lite';
import { Box, Paper } from '@mui/material';
import GroupSelect from '../UserControlPanel/GroupSelect';
import SelectButtons from '../ControlPanel/HomeControl/SelectButtons';
import ClearButton from '../ControlPanel/HomeControl/ClearButton';

const CardsList: React.FC = () => {
    const store = useContext(Context);

    useEffect(() => {
        store.receiveGroupCards(store.getCurrentGroupId());
    }, [])

    return (
        <Paper sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 2,
            padding: 1,
        }}>
            <Box sx={{
                display: 'flex',
                columnGap: 1,
                justifyContent: 'spaceBetween',
            }}>
                <GroupSelect />
                <SelectButtons />
                <ClearButton />
            </Box>
            {store.getCards().length > 0 && store.getCards()
                .map((card) => {
                    if (store.getIsCompletedDisplayMode() === undefined) {
                        return (
                            <Card key={card._id} _id={card._id} isAccepted={card.isAccepted} isCompleted={card.isCompleted} message={card.message} todos={card.todos} />
                        )
                    }
                    if (card.isCompleted === store.getIsCompletedDisplayMode()) {
                        return (
                            <Card key={card._id} _id={card._id} isAccepted={card.isAccepted} isCompleted={card.isCompleted} message={card.message} todos={card.todos} />
                        )
                    }
                })}
        </Paper>
    );
}
export default observer(CardsList);
