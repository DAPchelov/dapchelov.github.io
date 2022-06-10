import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';


const Todo = ({ task, handleToggle }) => {
    return (
    <div>
        <Paper elevation={1}>
        <ListItem disablePadding>
            <Checkbox
                checked={task.complete}
                onClick={() => handleToggle(task.id)}
            />
            <ListItemText primary={task.content} />
        </ListItem>
        </Paper>
    </div>
    );
}

export default Todo;