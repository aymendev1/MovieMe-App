import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import { MdLanguage } from "react-icons/md";
import { BsFillCalendarDateFill, BsBookmarkPlus } from "react-icons/bs";
import { YoutubePlayer } from "../effects/YoutubePlayer";

function ArticleTV(props) {
  const [data, setData] = React.useState([]);
  const [IsBookmarked, setIsBookmarked] = useState(false);
  let bookmarked = [];

  let { id } = useParams();
  let url = "/api/" + props.type + "/" + id;

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((daa) => setData(daa.content))
      .catch((err) => {
        console.log(err);
      });
  });

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
  const bookmarkButtonCheck = bookmarked.find((obj) => {
    return obj.id === data.id;
  });
  const bookmarkMe = () => {
    CheckBookmarkStorage();
    //// If the bookmarked is already bookmarked , we remove it after the click from the storages list
    bookmarked.map((bookmark) => {
      if (bookmark.id === data.id) {
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
        id: data.id,
        media_type: data.media_type,
        title: data.original_title,
        vote_average: data.vote_average,
        release_date: data.release_date,
        poster_path: data.poster_path,
      });
      localStorage.setItem("bookmarked", JSON.stringify(bookmarked));
      setIsBookmarked(true);
    }
  };

  function getDate(dateToFormat) {
    //Formating Date to string
    var airDate = new Date(dateToFormat);
    var airDateoptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return airDate.toLocaleDateString("en-US", airDateoptions);
  }

  return (
    <div className="section">
      <div className="container_article">
        <div className="grid1_article">
          <h1 className="title_article"> {data.name}</h1>
          <span className="tagline">
            {(data.tagline = null ? "" : data.tagline)}
          </span>
          <div className="informations_article">
            <div className="informations_article_child">
              <BiTimeFive className="details_info_article_icon" />
              <span className="details_info_article">
                {data.number_of_seasons} Seasons
              </span>
            </div>
            <div className="informations_article_child">
              <MdLanguage className="details_info_article_icon " />
              <span className="details_info_article">
                {
                  (data.original_language = null
                    ? "None available"
                    : data.original_language)
                }
              </span>
            </div>
            <div className="informations_article_child">
              <BsFillCalendarDateFill className="details_info_article_icon" />
              <span className="details_info_article">
                {getDate(data.first_air_date)}
              </span>
            </div>
          </div>
          <p className="overview_article">
            {(data.overview = null ? "None Available :(" : data.overview)}
          </p>
          <div className="table">
            <dl>
              <dt>
                <span>Genres </span>
              </dt>
              <dd>
                {data.genres === undefined
                  ? "Loading"
                  : data.genres.map((item) => {
                      let item_index = data.genres.indexOf(item) + 1;

                      if (item_index === data.genres.length) {
                        return <span>{item.name} </span>;
                      } else {
                        return <span>{item.name} , </span>;
                      }
                    })}
              </dd>
            </dl>
            <dl>
              <dt>
                <span>Audio Languages </span>
              </dt>
              <dd>
                {data.spoken_languages === undefined
                  ? "Loading"
                  : data.spoken_languages.map((item) => {
                      let item_index = data.spoken_languages.indexOf(item) + 1;

                      if (item_index === data.spoken_languages.length) {
                        return <span>{item.english_name} </span>;
                      } else {
                        return <span>{item.english_name} , </span>;
                      }
                    })}
              </dd>
            </dl>
            <dl>
              <dt>
                <span>Production Country </span>
              </dt>
              <dd>
                {data.production_countries === undefined
                  ? "Loading"
                  : data.production_countries.map((item) => {
                      let item_index =
                        data.production_countries.indexOf(item) + 1;

                      if (item_index === data.production_countries.length) {
                        return <span>{item.name} </span>;
                      } else {
                        return <span>{item.name} , </span>;
                      }
                    })}
              </dd>
            </dl>
            <dl>
              <dt>
                <span>Rate</span>
              </dt>
              <dd>{data.vote_average}</dd>
            </dl>
            <dl>
              <dt>
                <span>Producers </span>
              </dt>
              <dd>
                {data.production_companies === undefined
                  ? "Loading"
                  : data.production_companies.map((item) => {
                      let item_index =
                        data.production_companies.indexOf(item) + 1;

                      if (item_index === data.production_companies.length) {
                        return (
                          <a href={"/search/" + item.name}>{item.name} </a>
                        );
                      } else {
                        return (
                          <a href={"/search/" + item.name}>{item.name} , </a>
                        );
                      }
                    })}
              </dd>
            </dl>
            <dl>
              <dt>
                <span>Directors </span>
              </dt>
              <dd>
                {data.created_by === undefined
                  ? "Loading"
                  : data.created_by.map((item) => {
                      let item_index = data.created_by.indexOf(item) + 1;

                      if (item_index === data.created_by.length) {
                        return (
                          <a href={"/search/" + item.name}>{item.name} </a>
                        );
                      } else {
                        return (
                          <a href={"/search/" + item.name}>{item.name} , </a>
                        );
                      }
                    })}
              </dd>
            </dl>
          </div>
          <button className="bookmarkme" onClick={bookmarkMe}>
            <BsBookmarkPlus className="bookmarkme_icon" />
            {bookmarked.includes(bookmarkButtonCheck)
              ? "Remove From Bookmark"
              : "Bookmark Me"}
          </button>
        </div>
        <div className="grid2_article">
          <img
            className="backdrop_img"
            src={"https://image.tmdb.org/t/p/original" + data.backdrop_path}
            alt="Backdrop img"
          />
          <div className="shadow"></div>
        </div>
      </div>
      <div className="container_season">
        <button type="button" class="collapsible container_season_title">
          Seasons :
        </button>
        <div className="group-container">
          {data.seasons === undefined
            ? "Loading"
            : data.seasons.map((item) => {
                //Poster URl
                var posterURL;
                item.poster_path === null
                  ? (posterURL = `https://image.tmdb.org/t/p/original${data.poster_path}`)
                  : (posterURL = `https://image.tmdb.org/t/p/original${item.poster_path}`);

                return (
                  <div className="season_box">
                    <div className="season_poster">
                      <img src={posterURL} alt={item.name} />
                    </div>
                    <div className="season_details">
                      <span className="season_name">{item.name}</span>
                      <span className="season_epnum">
                        {item.episode_count === 1
                          ? `${item.episode_count} Episode`
                          : `${item.episode_count} Episodes`}
                      </span>
                      <span className="season_date">
                        {getDate(item.air_date)}
                      </span>
                      <span className="season_overview">
                        {item.overview === ""
                          ? "Overview will be available soon ..."
                          : item.overview}
                      </span>
                    </div>
                  </div>
                );
              })}
        </div>
        <button type="button" class="collapsible container_season_title">
          Trailers :
        </button>
        <div className="group-container">
          {data.seasons === undefined
            ? "Loading"
            : data.videos.results.map((item) => {
                if (item.type === "Teaser" || "Trailer") {
                  return (
                    <div className="season_box">
                      <div className="season_poster">
                        <YoutubePlayer videoID={item.key} />
                      </div>
                      <div className="season_details">
                        <span className="season_name">{item.name}</span>

                        <span className="season_date">
                          {item.published_at.substring(0, 10)}
                        </span>
                        <span className="season_date">{item.type}</span>
                      </div>
                    </div>
                  );
                }
              })}
        </div>
      </div>
    </div>
  );
}

export default ArticleTV;
