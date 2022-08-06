import { Link, useNavigate } from 'react-router-dom';
import './UserPanel.css'

interface IPropsUserPanel {
    setAutorized: (value: boolean) => void;
    setUserLogin: (value: string | undefined) => void;
    userLogin: string | undefined;
}

const UserPanel: React.FC<IPropsUserPanel> = (props: IPropsUserPanel) => {
    const navigate = useNavigate();

    const exitHandler = () => {
        props.setUserLogin(undefined);
        props.setAutorized(false)
        navigate("../", { replace: true });
    }
    return (
        <div className='UserPanel'>
            <div className='UserName'>{props.userLogin && props.userLogin}</div>
            <div className='exitIco' onClick={() => exitHandler()} />
            {/* <img src='./images/exit_ico.png' alt='Выход' onClick={() => exitHandler()} /> */}
        </div>
    );
}

export default UserPanel;