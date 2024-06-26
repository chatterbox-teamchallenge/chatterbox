import { useDispatch } from "react-redux";
import { icons } from "../../constants/icons";
import { resetUser } from "../../redux/reducers/userSlice";
import { useRef } from "react";

interface SidebarProps {
  avatar?: string | null;
}

export default function Sidebar({ avatar }: SidebarProps) {
  const homeRef = useRef<HTMLImageElement>(null);
  const dialogRef = useRef<HTMLImageElement>(null);
  const folderRef = useRef<HTMLImageElement>(null);
  const settingsRef = useRef<HTMLImageElement>(null);
  const allRefs = [homeRef, dialogRef, folderRef, settingsRef];
  const dispatch = useDispatch();

  function logout() {
    dispatch(resetUser());
    localStorage.removeItem("token");
  }

  function handleSwitch(ref: React.RefObject<HTMLImageElement>) {
    allRefs.forEach((element) => {
      if (element.current) {
        element.current.classList.remove("checked");
      }
    });
    if (ref.current) {
      ref.current.classList.add("checked");
    }
  }

  return (
    <div className="sidebar__container">
      <div className="sidebar navigation">
        <div className="sidebar avatar__container">
          {avatar && <img src={avatar} className="avatar" alt="avatar" />}
        </div>
        <div className="sidebar navbar__container">
          <img
            src={icons.home}
            className="navbar home checked"
            ref={homeRef}
            alt="home"
            onClick={() => handleSwitch(homeRef)}
          />
          <img
            src={icons.dialog}
            className="navbar dialogs"
            ref={dialogRef}
            alt="dialogs"
            onClick={() => handleSwitch(dialogRef)}
          />
          <img
            src={icons.folder}
            className="navbar folders"
            ref={folderRef}
            alt="folders"
            onClick={() => handleSwitch(folderRef)}
          />
          <img
            src={icons.settings}
            className="navbar settings"
            ref={settingsRef}
            alt="settings"
            onClick={() => handleSwitch(settingsRef)}
          />
        </div>
      </div>

      <div className="sidebar logout__container">
        <img src={icons.logout} className="logout" alt="logout" onClick={logout}/>
      </div>
    </div>
  );
}
