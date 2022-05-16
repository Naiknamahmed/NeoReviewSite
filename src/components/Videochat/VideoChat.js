import React, { Component } from 'react'
import { useParams } from 'react-router-dom';
import Thankyou from 'components/Thankyou/Thankyou';
import { Link } from 'react-router-dom';
export default class VideoChat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            room: 'Teachers 2',
            user: {
                name: 'Shehzad shah'
            },
            isAudioMuted: false,
            isVideoMuted: false
        }
    }

    componentDidMount() {
        console.log("idd idd", this.props);
        const { id } = this.props.params;
        console.log("this is idd", this.props);
        if (window.JitsiMeetExternalAPI) {
            this.startMeet();
        } else {
            alert('JitsiMeetExternalAPI not loaded');
        }
    }

    domain = 'meet.jit.si';
    api = {};


    startMeet = (paramID) => {
        const options = {
            roomName: paramID || this.state.room,
            width: '100%',
            height: 500,
            configOverwrite: { prejoinPageEnabled: false },
            interfaceConfigOverwrite: {
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: this.state.user.name
            }
        }
        this.api = new window.JitsiMeetExternalAPI(this.domain, options);

        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus
        });
    }

    handleClose = () => {
        console.log("handleClose");
    }

    handleParticipantLeft = async (participant) => {
        console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
        const data = await this.getParticipants();
    }

    handleParticipantJoined = async (participant) => {
        console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
        const data = await this.getParticipants();
    }

    handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
        const data = await this.getParticipants();
    }

    handleVideoConferenceLeft = () => {
        console.log("handleVideoConferenceLeft");

    }

    handleMuteStatus = (audio) => {
        console.log("handleMuteStatus", audio); // { muted: true }
    }

    handleVideoStatus = (video) => {
        console.log("handleVideoStatus", video); // { muted: true }
    }

    getParticipants() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }

    // custom events
    executeCommand(command) {
        this.api.executeCommand(command);;
        if (command == 'hangup') {
            return this.props.history.push('/thank-you');
        }

        if (command == 'toggleAudio') {
            this.setState({ isAudioMuted: !this.state.isAudioMuted });
        }

        if (command == 'toggleVideo') {
            this.setState({ isVideoMuted: !this.state.isVideoMuted });
        }
    }

    componentDidMount(props) {
        var url_string = window.location.href;
        var url = new URL(url_string);
        const pathname = window.location.pathname;
        var mainurl = pathname.split('/');
        this.setState({ room: mainurl[2] });
        console.log("second url", mainurl[2])
        console.log("mainurl is", mainurl);
        console.log("url string", url_string);
        console.log("url is", url);
        console.log("pathname is", pathname);

        if (window.JitsiMeetExternalAPI) {
            this.startMeet(mainurl[2]);
        } else {
            alert('JitsiMeetExternalAPI not loaded');
        }
    }

    render() {
        const { isAudioMuted, isVideoMuted } = this.state;
        return (
            <>
                <header className="nav-bar">
                </header>
                <div id="jitsi-iframe"></div>
                <div className="item-center">
                </div>
                <div className="item-center" style={{ textAlign: 'center', marginTop: "20px" }} >
                    <span>&nbsp;&nbsp;</span>
                    <i onClick={() => this.executeCommand('toggleAudio')} className={`fas fa-2x grey-color ${isAudioMuted ? 'fa-microphone-slash' : 'fa-microphone'}`} aria-hidden="true" title="Mute / Unmute"></i> &nbsp; &nbsp; &nbsp;
                    <Link onClick={() => this.executeCommand('hangup')} to="/Thankyou" className="fas fa-phone-slash fa-2x red-color" aria-hidden="true" title="Leave"></Link>&nbsp; &nbsp;&nbsp;
                    <i onClick={() => this.executeCommand('toggleVideo')} className={`fas fa-2x grey-color ${isVideoMuted ? 'fa-video-slash' : 'fa-video'}`} aria-hidden="true" title="Start / Stop camera"></i>&nbsp;&nbsp;&nbsp;
                    <i onClick={() => this.executeCommand('toggleShareScreen')} className="fas fa-film fa-2x grey-color" aria-hidden="true" title="Share your screen"></i>
                </div>


            </>
        );
    }
}
