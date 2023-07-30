import { useEffect, useState } from "react";
import Form from "../components/UI/Form/Form";
import { useAppSelector } from "../hooks/redux";
import ModalError from "../components/UI/modal/modalError/ModalError";

const LoginPage = () => {

    // const dispatch = useAppDispatch()
    const { error } = useAppSelector(state => state.userReducer)

    const [errorMessage, setErrorMessage] = useState<string | null>(error);

    // console.log(errorMessage)

    const handleError = (message: string) => {
        setErrorMessage(message);
    };

    const handleCloseError = () => {
        setErrorMessage(null);
    };

    useEffect(() => {
        if (error) {
            handleError(error)
        }
    }, [error])

    return (
        <>
        <Form type="login"></Form>
         {errorMessage && (
                    <ModalError message={errorMessage} onClose={handleCloseError} />
                )}
        </>
    )
}

export default LoginPage