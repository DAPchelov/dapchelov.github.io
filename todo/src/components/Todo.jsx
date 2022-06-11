import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


const Todo = ({ task, handleToggle }) => {
    return (
            <Paper elevation={1}>
                <ListItem disablePadding aria-multiline>
                    <Checkbox
                        checked={task.complete}
                        onClick={() => handleToggle(task.id)}
                    />
                    <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {task.content}
                    </Typography>
                </ListItem>
            </Paper>
    );
}

export default Todo;