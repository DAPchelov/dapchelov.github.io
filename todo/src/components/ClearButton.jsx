import Button from '@mui/material/Button';

const ClearButton = ({ clearFinished }) => {
    return (
        <Button variant="text" sx={{fontSize: 10}} onClick={() => clearFinished()}>clear completed</Button>
    );
}

export default ClearButton;