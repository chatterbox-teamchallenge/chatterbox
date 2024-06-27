import { useSelector } from "react-redux"
import Sidebar from "../../components/Sidebar/Sidebar"
import { RootState } from "../../redux/store";
import Dialog from "../../components/Dialog/Dialog";
import '../../styles/components/_chat.scss'



const Chat = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="chat">
            <Sidebar avatar={user.avatar} />
            <Dialog/>
        </div>
    )
}

export default Chat