import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {  Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../App'

const DocList: React.FC = () => {

    const store = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        store.newDoc.foundDocs.length = 0;
    })

    const navigateCallback = (docId: string | number) => {
        store.newDoc.getEditableDoc(docId);
        navigate('/editdoc')
    };

    const columns: GridColDef[] = [
        { field: 'docDecNum', headerName: 'Документ', flex: 16, minWidth: 120, maxWidth: 300 },
        { field: 'docName', headerName: 'Наименование', flex: 16 },
        { field: 'prodName', headerName: 'Название изделия', flex: 16 },
        { field: 'folderNum', headerName: '№ папки', flex: 8, maxWidth: 100 },
    ];
    const paginationModel = { page: 0, pageSize: 10 };

    return (
        <Paper sx={{ width: '100%' }}>
            <DataGrid
                getRowId={(doc) => doc._id}
                rows={store.newDoc.foundDocs}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 20]}
                onRowClick={(row) => { navigateCallback(row.id) }}
                sx={{ border: 0 }}
            />
        </Paper>
    );
}

export default observer(DocList);
