import React, { useState } from "react";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { MdUpdate, MdMovieFilter } from "react-icons/md";
function TrendingCard(props) {
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
        console.log("Bookmarked removed");
        setIsBookmarked(false);
      }
    });
    //// If the bookmarked is not  bookmarked , we add it to the Storage
    if (IsBookmarked === false) {
      console.log("Not Bookmarked");
      bookmarked.push({
        id: props.itemID,
        media_type: props.categorie,
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
    <div className="TrendingCard">
      <a href={props.linkHref}>
        <img
          className="TrendingCard_image"
          src={props.imageurl}
          alt={props.name}
        />
      </a>

      <div className="TrendingCard_content">
        <div className="TrendingCard_details">
          <MdUpdate className="TrendingCard_breakpoint" />
          <span className="year">{props.year} | </span>
          <MdMovieFilter className="TrendingCard_breakpoint" />
          <span className="categorie">{props.categorie} | </span>
          <AiFillStar className="TrendingCard_breakpoint" />
          <span className="age">{props.review}</span>
        </div>
        <div className="TrendingCard_name">
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
export default TrendingCard;
