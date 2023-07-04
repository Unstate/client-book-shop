import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../ReduxToolkit/store";
import { useMemo } from "react";
import { BooksProps } from "../ReduxToolkit/bookSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;

// Потом нужно будет удалить, это тест
export const useBooks = (books:BooksProps[], value:string) => {
    console.log('Отработала')
    const filterBooks = () => {
        return books.filter(book => book.title.toLowerCase().includes(value.toLowerCase()))
    }
    return filterBooks
}