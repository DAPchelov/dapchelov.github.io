import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useContext } from 'react';
import { Context } from '../../src/index'
import { observer } from 'mobx-react-lite';

interface IoutlinedButton {
    buttonOutlined: boolean | undefined,
}

const outlineButton = (value: IoutlinedButton['buttonOutlined'], state: IoutlinedButton['buttonOutlined']) => {
    if (value === state) {
        return ("contained")
    }
    return ("text")
}

const SelectButtons: React.FC = () => {
    const store = useContext(Context);

    return (
        <ButtonGroup variant="text" aria-label="text button group">
            <Button variant={outlineButton(undefined, store.getIsCompletedDisplayMode())} sx={{fontSize: 10}} size="small" onClick={() => store.setIsCompletedDisplayMode(undefined)}>All</Button>
            <Button variant={outlineButton(false, store.getIsCompletedDisplayMode())} sx={{fontSize: 10}} size="small" onClick={() => store.setIsCompletedDisplayMode(false)}>Active</Button>
            <Button variant={outlineButton(true, store.getIsCompletedDisplayMode())} sx={{fontSize: 10}} size="small" onClick={() => store.setIsCompletedDisplayMode(true)}>Completed</Button>
        </ButtonGroup>
    );
}

export default observer(SelectButtons);