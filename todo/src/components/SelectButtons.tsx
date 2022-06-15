import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

interface IPropsSelectButtons {
    setCompleted: (value: undefined | false | true) => void;
}

const SelectButtons: React.FC<IPropsSelectButtons> = (props: IPropsSelectButtons) => {
    return (
        <ButtonGroup variant="text" aria-label="text button group">
            <Button sx={{fontSize: 10}} onClick={() => props.setCompleted(undefined)}>All</Button>
            <Button sx={{fontSize: 10}} onClick={() => props.setCompleted(false)}>Active</Button>
            <Button sx={{fontSize: 10}} onClick={() => props.setCompleted(true)}>Completed</Button>
        </ButtonGroup>
    );
}

export default SelectButtons;