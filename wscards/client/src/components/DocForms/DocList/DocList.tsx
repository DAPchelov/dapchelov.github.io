import React from 'react';
import Doc from './Doc'
import { observer } from 'mobx-react-lite';
import { IEditableDoc } from '../../../store/NewDocController';
import { Box } from '@mui/material';
import HeaderDoc from './HeaderDoc';

type ITodoListProps = {
    docs: IEditableDoc[],
    // checkTodo (id: string | undefined): void,
}

const DocList: React.FC<ITodoListProps> = (props: ITodoListProps) => {

    return (
        <Box sx ={{
            width: '100%',
        }}>
            <HeaderDoc />
            {props.docs.map(doc => {
                return (<Doc key={doc._id} content={doc} />)
            })}
        </Box>
    );
}

export default observer(DocList);
