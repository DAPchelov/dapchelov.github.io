import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const SelectButtons = ({ setCompleted }) => {
    return (
        <ButtonGroup variant="text" aria-label="text button group">
            <Button sx={{fontSize: 10}} onClick={() => setCompleted(undefined)}>All</Button>
            <Button sx={{fontSize: 10}} onClick={() => setCompleted(false)}>Active</Button>
            <Button sx={{fontSize: 10}} onClick={() => setCompleted(true)}>Completed</Button>
        </ButtonGroup>
    );
}

export default SelectButtons;