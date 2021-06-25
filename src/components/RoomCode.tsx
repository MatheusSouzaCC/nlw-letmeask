import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string
}

export function RoomCode(props: RoomCodeProps){

    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code);
    }

    return (
        <button onClick={copyRoomCodeToClipboard} className="room-code">
            <div>
                <img src={copyImg} alt="Copiar" />
            </div>
            <span>Sala #-Md-Q48Apq9Ib3QPLkny</span>
        </button>
    )
}