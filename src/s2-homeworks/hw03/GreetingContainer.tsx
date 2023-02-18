import React, {ChangeEvent, Dispatch, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'
import {UserType} from './HW3'

type addUserCallbackType = (name: string) => void

type GreetingContainerPropsType = {
    users: Array<UserType>
    addUserCallback: addUserCallbackType
}
const errorNotName: string = 'ошибка: введите имя';

export const pureAddUser = (name: string, setError: Dispatch<string>, setName: Dispatch<string>, addUserCallback: addUserCallbackType) => {
    if (!name) {
        setError(errorNotName)
    } else {
        addUserCallback(name)
        setName('')
    }
}

export const pureOnBlur = (name: any, setError: any) => {
    if (!name) {
        setError(errorNotName)
    } else {
        setError('')
    }
}


export const pureOnEnter = (e: React.KeyboardEvent<HTMLInputElement>, addUser: addUserCallbackType) => { // если нажата кнопка Enter - добавить
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter") {
        addUser(target.value)
    }
}

const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
                                                                     users,
                                                                     addUserCallback,
                                                                 }) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string>('')

    const setNameCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length
    const lastUserName = users[users.length -1]?.name



    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
