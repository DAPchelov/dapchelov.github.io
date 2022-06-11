import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';


const Todo = ({ task, handleToggle }) => {
    return (
    <div>
        <Paper elevation={1}>
        <ListItem disablePadding aria-multiline>
            <Checkbox
                checked={task.complete}
                onClick={() => handleToggle(task.id)}
            />
            <ListItemText 
            primaryTypographyProps={{ 
                style: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }
            }}
            primary={task.content} />
        </ListItem>
        </Paper>
    </div>
    );
}

export default Todo;