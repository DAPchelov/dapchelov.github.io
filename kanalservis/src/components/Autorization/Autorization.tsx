import './Autorization.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

type IFormInputs = {
    login: string;
    password: string;
};
interface IPropsAutorization {
    setUserLogin: (value: undefined | string) => void;
    setAutorized: (value: boolean) => void;
}

const Autorization: React.FC<IPropsAutorization> = (props: IPropsAutorization) => {
    const [wrongUser, setWrongUser] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        getValues,
        formState: { isValid }
    } = useForm<IFormInputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        if ((data.login != 'Bret') && (data.password != 'password')) {
            setWrongUser(true);
        } else {
            props.setUserLogin(data.login);
            props.setAutorized(true);
            navigate("../posts", { replace: true });
        }
    };

    return (
        <div className='Autorization'>
            <div className='Autorization-text'>Autorization</div>
            <form onSubmit={handleSubmit(onSubmit)} className='Autorization-inputFields'>
                <div className='Autorization-input'>
                    <div className='Autorization-user'>
                        login
                    </div>
                    <input type="text" className='Autorization-field' {...register('login', { required: true })} />
                </div>
                <div className='Autorization-input'>
                    <div className='Autorization-user'>
                        password
                    </div>
                    <input type="password" className='Autorization-field' {...register('password', { required: true })} />
                </div>
                <input type="submit" value='Sign in' className='Autorization-hideInput' />
                {wrongUser && <div>неверный логин или пароль</div>}
            </form>
        </div>
    );
}

export default Autorization;