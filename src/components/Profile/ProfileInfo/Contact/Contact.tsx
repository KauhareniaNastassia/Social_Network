import React from 'react';

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

export const Contact = (props: ContactPropsType) => {
    return <div> <b>{props.contactTitle}:</b> {props.contactValue} </div>
}

