import react from "react";
import { BiCameraMovie, BiMenu } from "react-icons/bi";
import { BsGridFill, BsGithub } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import {
  MdLocalMovies,
  MdLiveTv,
  MdOutlineBookmark,
  MdOutlineLogout,
} from "react-icons/md";
function sidebar() {
  return (
    <div className="sidebar">
      <div className="logoContent">
        <div className="logo">
          <BiCameraMovie className="icon-edit" />
          <span className="logo_name">MovieMe</span>
        </div>
      </div>

      <BiMenu id="btn" />
      <AiOutlineClose id="btn-close" />

      <ul className="nav_list">
        <li>
          <a href="/">
            <BsGridFill className="icon_list" />
            <span className="links_name">Dashboard</span>
          </a>
          <span className="tooltip">Dashboard</span>
        </li>
        <li>
          <a href="/movies">
            <MdLocalMovies className="icon_list" />
            <span className="links_name">Movies</span>
          </a>
          <span className="tooltip">Movies</span>
        </li>
        <li>
          <a href="/tvshows">
            <MdLiveTv className="icon_list" />
            <span className="links_name">Tv Shows</span>
          </a>
          <span className="tooltip">Tv Shows</span>
        </li>
        <li>
          <a href="/bookmarks">
            <MdOutlineBookmark className="icon_list" />
            <span className="links_name">Bookmarks</span>
          </a>
          <span className="tooltip">Bookmarks</span>
        </li>
      </ul>
      <div className="profile_content">
        <div className="profile">
          <div className="profile_details">
            <img src="/profilepic.jpg" />
            <a className="UserName" href="https://github.com/aymendev1">
              Aymendev1
            </a>
          </div>
          <BsGithub id="log_out" />
        </div>
      </div>
    </div>
  );
}
export default sidebar;
