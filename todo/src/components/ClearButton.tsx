import Button from '@mui/material/Button';

interface IPropsClearButton {
    clearCompleted: () => void;
}

const ClearButton: React.FC<IPropsClearButton> = (props: IPropsClearButton) => {
    return (
        <Button variant="text" sx={{ fontSize: 10 }} onClick={() => props.clearCompleted()}>clear completed</Button>
    );
}

export default ClearButton;