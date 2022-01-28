import React, {ChangeEvent} from 'react';

export type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    onDoubleClickSetEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    onBlurSetEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps: ProfileStatusType, prevState: ProfileStatusType) {
        if (prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <>
                {this.state.editMode
                    ? <div>
                        <input autoFocus
                               onChange={this.onChangeStatus}
                               onBlur={this.onBlurSetEditMode}
                               value={this.state.status}
                               type="text"/>
                    </div>
                    : <div>
                        <span onDoubleClick={this.onDoubleClickSetEditMode}>{this.props.status}</span>
                    </div>}
            </>)
    }
}

export default ProfileStatus;