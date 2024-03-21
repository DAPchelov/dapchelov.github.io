import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from './App'
import Avatar from '@mui/material/Avatar';
import { lightBlue } from '@mui/material/colors';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { pink } from '@mui/material/colors';
import { amber } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import { cyan } from '@mui/material/colors';
import { deepPurple } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { lime } from '@mui/material/colors';
import { indigo } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';
import { deepOrange } from '@mui/material/colors';
import { purple } from '@mui/material/colors';
import { grey } from '@mui/material/colors';


const createColorNum = (userId: string) => {
  let value = 0;

  for (let i = 0; i < 24; i++) {
    value += userId.charCodeAt(i)
  }
  value -= 1500;

  if (value < 0) { value *= -1 }
  for (; value >= 20;) {
    value /= 2
    value = Math.ceil(value);
  }
  return value;
}

export const assignColor = (userId: string) => {
  const value = createColorNum(userId);
  if (value <= 10) return (pink);
  if (value === 11) return (blue);
  if (value === 12) return (indigo);
  if (value === 13) return (deepPurple);
  if (value === 14) return (green);
  if (value === 15) return (lime);
  if (value === 16) return (cyan);
  if (value === 17) return (deepOrange);
  if (value === 18) return (amber);
  if (value === 19) return (yellow);
  return (purple);
}

const UserBadge: React.FC = () => {
  const store = useContext(Context);
  const user = store.getUser();

  if (user.email !== undefined) {

    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: assignColor(user._id)[600] }}>{user.email[0].toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={store.getUser().email} secondary='Команда Ракета' />
      </ListItem>
    );
  }
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: grey[600] }}>L</Avatar>
      </ListItemAvatar>
      <ListItemText primary='Loading User' secondary='Команда Ракета' />
    </ListItem>
  );

};

export default observer(UserBadge);

