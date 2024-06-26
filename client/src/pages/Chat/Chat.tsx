import { useSelector } from "react-redux"
import Sidebar from "../../components/Sidebar/Sidebar"
import { RootState } from "../../redux/store";

const Chat = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="chat">
            <Sidebar avatar={user.avatar}/>
        </div>
    )
}

export default Chat