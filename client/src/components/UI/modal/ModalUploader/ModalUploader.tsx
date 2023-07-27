import { useState, useRef, FC } from "react";
import classes from './ModalUploader.module.css'
import notImage from '../../../../assets/g38.svg'
import cross from '../../../../assets/Cross.svg'
import { deleteUserImage, setNewUserImage } from "../../../../ReduxToolkit/actionCreators";

interface ModalUploaderProps {
    children: React.ReactElement | React.ReactNode;
    visable: boolean;
    setVisable: Function;
    id: string;
}

const ModalUploader: FC<ModalUploaderProps> = ({ children, visable, setVisable,id }) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<FileList | null>(null);

    const handleDragOver = (event: any) => {
        event.preventDefault();
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files)
    };

    const handleClick = (e: any) => {
        e.preventDefault()
        if (inputRef.current) {
            inputRef.current.click();
        }
    }


    const handleClearClick = (e: any) => {
        e.preventDefault()
        setFiles(null);
    };

    // files ? console.log(files) : console.log('Нет файлов')
    // const file = inputRef.current?.files
    // console.log(files[0])

    return (
        <>
            {visable
                ? <div className={classes.modalWrapper}>
                    <div className={classes.modalContainer}>
                        <div className={classes.modalTitle}>
                            {children}
                            <img
                                src={cross}
                                className={classes.crossImage}
                                onClick={() => setVisable(false)} />
                        </div>
                        <div
                            className={classes.dropzone}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}>
                            {files
                                ? <div className="uploads">
                                    <ul>
                                        {Array.from(files).map((file: any, idx) => <li key={idx}>{file.name}</li>)}
                                    </ul>
                                    <div className="actions">
                                        <button
                                            className={classes.modalButton}
                                            onClick={() => {
                                                setNewUserImage(id,files)
                                                setVisable(false)
                                            }}>
                                            Сохранить изменения
                                        </button>
                                    </div>
                                </div>
                                : <>
                                    <img className={classes.modalImg} src={notImage}></img>
                                    <p className={classes.modalDesc}>Выберите изображение на устройстве</p>
                                    <input
                                        type="file"
                                        onChange={(event) => setFiles(event.target.files)}
                                        hidden
                                        accept="image/*"
                                        ref={inputRef}

                                    />
                                    <div className={classes.modalButtonContainer}>
                                        <button
                                            className={classes.modalButton}
                                            onClick={(e) => handleClick(e)}>
                                            Выбрать файл
                                        </button>
                                        <button
                                            className={`${classes.modalButton} ${classes.modalButtonActive}`}
                                            onClick={(e) => handleClick(e)}>
                                            Вставить из буфера
                                        </button>
                                    </div>
                                </>}
                        </div>
                        <button
                            className={`${classes.modalButton} ${classes.modalButtonDelete}`}
                            onClick={() => deleteUserImage(id)}>
                                
                                {/* (e) => handleClearClick(e) */}
                            Удалить фотографию
                        </button>
                    </div>
                </div>
                : <></>}
        </>
    );
};

export default ModalUploader;