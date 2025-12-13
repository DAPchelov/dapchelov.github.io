import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Chip, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../App'

const DocList: React.FC = () => {

    const store = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        // store.docController.foundDocs.length = 0;
    }, [])

    const navigateCallback = (docId: string | number) => {
       
        store.docController.getEditableDoc(docId);
        navigate('/editdoc')
    };

    const editingButton = (docId: string | number) => {
        return (
            <Button onClick={() => navigateCallback(docId)}>
                Редактировать
            </Button>
        )
    }

    const columns: GridColDef[] = [
        { field: 'docDecNum', headerName: 'Документ', flex: 16, minWidth: 120, maxWidth: 300 },
        { field: 'docName', headerName: 'Наименование', flex: 16 },
        { field: 'prodName', headerName: 'Название изделия', flex: 16 },
        { field: 'folderNum', headerName: '№ папки', flex: 8, maxWidth: 150 },
        {
            field: 'numCrossings', headerName: '<->', flex: 6, maxWidth: 60, hideSortIcons: true,
            renderCell: ({ row }: Partial<GridRowParams>) => (<Chip label = {row.crossedDocs.length}/>)
        },
        {
            field: 'docEdit', headerName: '', flex: 14, maxWidth: 160, hideSortIcons: true,
            renderCell: ({ row }: Partial<GridRowParams>) => editingButton(row._id)
        },
    ];



    const paginationModel = { page: 0, pageSize: 11 };

    return (
        <Paper sx={{ width: '100%' }}>
            <DataGrid
                getRowId={(doc) => doc._id}
                rows={store.docController.foundDocs}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 11, 22, 100]}
                disableColumnFilter={true}
                disableColumnMenu={true}
                sx={{ border: 0 }}
            />
        </Paper>
    );
}

export default observer(DocList);
