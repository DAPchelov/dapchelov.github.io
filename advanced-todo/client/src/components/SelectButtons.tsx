import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

interface IPropsSelectButtons {
    setCompleted: (value: undefined | false | true) => void;
    completed: boolean | undefined;
}

const outlineButton = (value: IPropsSelectButtons["completed"], state: IPropsSelectButtons["completed"]) => {
    if (value === state) {
        return ("contained")
    }
    return ("text")
}

const SelectButtons: React.FC<IPropsSelectButtons> = (props: IPropsSelectButtons) => {
    return (
        <ButtonGroup variant="text" aria-label="text button group">
            <Button variant={outlineButton(undefined, props.completed)} sx={{fontSize: 10}} size="small" onClick={() => props.setCompleted(undefined)}>All</Button>
            <Button variant={outlineButton(false, props.completed)} sx={{fontSize: 10}} size="small" onClick={() => props.setCompleted(false)}>Active</Button>
            <Button variant={outlineButton(true, props.completed)} sx={{fontSize: 10}} size="small" onClick={() => props.setCompleted(true)}>Completed</Button>
        </ButtonGroup>
    );
}

export default SelectButtons;