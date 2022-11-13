import react from "react";
import Card from "../components/SectionCard";

function BookmarkedSection(props) {
  const [isError, setError] = react.useState(false);
  let bookmarkedItems = [];
  const CheckBookmarkStorage = () => {
    try {
      if (localStorage.getItem("bookmarked") === null) {
        // WHEN STORAGE DOESN'T EXIST , WE CREATE A LOCAL STORE FILE
        localStorage.setItem("bookmarked", JSON.stringify(bookmarkedItems));
      } else {
        // WHEN STORAGE DOESN'T EXIST , WE CREATE A LOCAL STORE FILE
        bookmarkedItems = JSON.parse(localStorage.getItem("bookmarked"));
        console.log(bookmarkedItems);
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  CheckBookmarkStorage();

  return (
    <div className="section">
      <h1 className="Trending_title">
        {props.title} ( {bookmarkedItems.length} )
      </h1>
      {isError ? (
        <p className="error-msg">Server Crashed , Please try again :( </p>
      ) : (
        <div className="container">
          {bookmarkedItems.map((item) => (
            <Card
              name={item.title}
              review={item.vote_average}
              age={item.adult ? "+18" : "-18"}
              year={item.release_date.substring(0, 4)}
              linkHref={`/${item.media_type}/${item.id}`}
              imageurl={"https://image.tmdb.org/t/p/w300" + item.poster_path}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookmarkedSection;
