import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks = (props: ProfileStatusType) => {
    const [status, setStatus] = useState(props.status)
    const [editMode, setEditMode] = useState<boolean>(false)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const onDoubleClickSetEditMode = () => {
        setEditMode(true)
    }
    const onBlurSetEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <>
            {editMode
                ? <div>
                    <input autoFocus
                           onChange={onChangeStatus}
                           onBlur={onBlurSetEditMode}
                           value={status}
                           type="text"/>
                </div>
                : <div>
                    <span onDoubleClick={onDoubleClickSetEditMode}>{props.status || '-------------'} </span>
                </div>}
        </>)

}

export default ProfileStatusWithHooks;