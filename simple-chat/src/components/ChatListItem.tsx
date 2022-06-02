import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

interface itemProps {
  user: string;
  content: string;
}

const ChatListItem: React.FC<itemProps> = itemProps => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <PermIdentityIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={itemProps.user} secondary={itemProps.content} />
    </ListItem>
  );
};

export { ChatListItem };
