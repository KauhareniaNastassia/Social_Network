import React, {Component} from 'react';


export class ProfileStatus extends Component<ProfileStatusClassPropsType> {

    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                    </div>}

                {this.state.editMode &&
                    <div>
                        <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.props.status}></input>
                    </div>}
            </div>
        );
    }
};


//===========TYPE================

export type ProfileStatusPropsType = {
    status: string
}

export type ProfileStatusClassPropsType = Readonly<ProfileStatusPropsType>

