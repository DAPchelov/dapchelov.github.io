import React from 'react';
import { observer } from 'mobx-react-lite';

import SelectButtons from './SelectButtons';
import ClearButton from './ClearButton';

const HomeControl: React.FC = () => {
    return (
        <>
            <SelectButtons />
            <ClearButton />
        </>
    );
}

export default observer(HomeControl);