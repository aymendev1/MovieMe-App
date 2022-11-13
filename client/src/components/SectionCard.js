import React, { useState } from "react";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";

function Card(props) {
  const [IsBookmarked, setIsBookmarked] = useState(false);
  let bookmarked = [];

  const CheckBookmarkStorage = () => {
    if (localStorage.getItem("bookmarked") === null) {
      // WHEN STORAGE DOESN'T EXIST , WE CREATE A LOCAL STORE FILE
      localStorage.setItem("bookmarked", JSON.stringify(bookmarked));
    } else {
      // WHEN STORAGE DOESN'T EXIST , WE CREATE A LOCAL STORE FILE
      bookmarked = JSON.parse(localStorage.getItem("bookmarked"));
    }
  };
  CheckBookmarkStorage();
  const bookmarkIconCheck = bookmarked.find((obj) => {
    return obj.id === props.itemID;
  });
  const bookmarkMe = () => {
    CheckBookmarkStorage();
    //// If the bookmarked is already bookmarked , we remove it after the click from the storages list
    bookmarked.map((bookmark) => {
      if (bookmark.id === props.itemID) {
        bookmarked.splice(bookmarked.indexOf(bookmark), 1);
        localStorage.setItem("bookmarked", JSON.stringify(bookmarked));
        setIsBookmarked(false);
      }
    });
    //// If the bookmarked is not  bookmarked , we add it to the Storage
    if (IsBookmarked === false) {
      bookmarked.push({
        id: props.itemID,
        media_type: props.itemType,
        title: props.name,
        vote_average: props.review,
        release_date: props.year,
        poster_path: props.imageurl,
      });
      localStorage.setItem("bookmarked", JSON.stringify(bookmarked));
      setIsBookmarked(true);
    }
  };

  return (
    <div className="Card" key={props.key}>
      <div className="card_image_box shine">
        <a href={props.linkHref}>
          <img className="card_image" src={props.imageurl} alt={props.name} />
        </a>
      </div>

      <div className="Card_content">
        <div className="Card_details">
          <MdUpdate className="Card_breakpoint" />
          <span className="year">{props.year} |</span>
          <AiFillStar className="Card_breakpoint" />
          <span className="categorie">{props.review} |</span>
          <VscDebugBreakpointLog className="Card_breakpoint" />
          <span className="age">{props.age}</span>
        </div>
        <div className="Card_name">
          <a href={props.linkHref}>{props.name}</a>
        </div>
      </div>
      <button className="bookmarkbtn" onClick={bookmarkMe}>
        {bookmarked.includes(bookmarkIconCheck) ? (
          <BsFillBookmarkCheckFill />
        ) : (
          <BsBookmarkPlus />
        )}
      </button>
    </div>
  );
}

export default Card;
