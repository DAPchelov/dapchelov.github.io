import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../App'
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { pink, amber, blue, cyan, deepPurple, green, lime, indigo, yellow, deepOrange, purple, grey } from '@mui/material/colors';

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
  const user = store.userController.user;

  // const getCurrentGroupLabel = () => {
  //   if (store.getAllUserGroups() === undefined) {return('Команда Ракета')};
  //   if (store.getCurrentGroupId() === undefined) {return('Загружаем карточки')};
  //   if (store.getUser()._id === store.getCurrentGroupId()) {return('Мои карточки')};
  //   const groupLabel = store.getAllUserGroups().find((group) => { if (group._id === store.getCurrentGroupId()) {
  //     return group
  //   }})?.label;
  //   return (groupLabel);
  // }

  if (user._id) {
    return (
      <ListItem sx={{ padding: 0 }}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: assignColor(user._id)[600] }}>{user.login[0].toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={store.userController.user.login}
        // secondary={ getCurrentGroupLabel() }
        />
      </ListItem>
    );
  }
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: grey[600] }}>L</Avatar>
      </ListItemAvatar>
      <ListItemText primary='Загрузка пользователя'
      // secondary='Команда Ракета'
      />
    </ListItem>
  );
};

export default observer(UserBadge);

