import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void

}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEdtiMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEdtiMode(true)
    const offEditMode = () => {
        setEdtiMode(false)
        props.changeTitle(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            setEdtiMode(false)
            props.changeTitle(title)
        }
    }

    return (
        editMode
            ? <TextField
            variant={"standard"}
                value={title}
                autoFocus
                onChange={changeTitle}
                onBlur={offEditMode}
                onKeyPress={onEnter}
            />
            // ? <input
            //     value={title}
            //     autoFocus
            //     onChange={changeTitle}
            //     onBlur={offEditMode}
            //     onKeyPress={onEnter}
            // />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )

}