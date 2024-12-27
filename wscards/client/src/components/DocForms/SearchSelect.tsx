import ListItem from '@mui/material/ListItem';
import { observer } from 'mobx-react-lite';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

interface ISearchSelectProps {
    setSearchType: (e: string) => void
}

const SearchSelect: React.FC<ISearchSelectProps> = (props: ISearchSelectProps) => {

    const handleSearchChange = (event: SelectChangeEvent | undefined) => {
        event && props.setSearchType(event.target.value);
    }

    return (
        <ListItem sx={{
            margin: 0,
            padding: 0,
            width: '60%',
        }}>
            <FormControl fullWidth>
                <InputLabel>Поиск</InputLabel>
                <Select
                    defaultValue={''}
                    label="Мои карточки"
                    onChange={handleSearchChange}>
                    <MenuItem value={'docDecNum'} key={'docDecNum'}>По обозначению</MenuItem>
                    <MenuItem value={'docName'} key={'docName'}>По наименованию</MenuItem>
                    <MenuItem value={'prodName'} key={'prodName'}>По изделию</MenuItem>
                    <MenuItem value={'folderNum'} key={'folderNum'}>По номеру папки</MenuItem>
                </Select>
            </FormControl>
        </ListItem>
    );
}

export default observer(SearchSelect);