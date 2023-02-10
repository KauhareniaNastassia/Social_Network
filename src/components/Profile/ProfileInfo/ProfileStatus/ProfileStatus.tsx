import React, {ChangeEvent, Component} from 'react';


export class ProfileStatus extends Component<ProfileStatusClassPropsType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusClassPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span
                            onDoubleClick={this.activateEditMode}>{this.props.status || 'Tell everyone what happened!'}
                        </span>
                    </div>}

                {this.state.editMode &&
                    <div>
                        <input
                            value={this.state.status}
                            onChange={this.onStatusChange}
                            autoFocus={true}
                            onBlur={this.deactivateEditMode}
                            >
                        </input>
                    </div>}
            </div>
        );
    }
};


//===========TYPE================

export type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export type ProfileStatusClassPropsType = Readonly<ProfileStatusPropsType>



//после он блюр вылетает приложение, белый экран














/*import React, {ChangeEvent, useEffect, useState} from 'react';


export type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks = (props: ProfileStatusPropsType) => {

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            { editMode === false
                ?   <div>
                    <span style={{fontStyle: "italic" }} onDoubleClick={() =>{setEditMode(true)} } > {props.status || "no status yet"}</span>
                </div>

                :   <div>
                    <input autoFocus={ true } onBlur={deactivateEditMode} onChange={onStatusChange} value={status} />
                </div>
            }
        </div>
    );
};*/
