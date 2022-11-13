import react from "react";
import Card from "../sections/SectionCard";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import RotateLoader from "react-spinners/RotateLoader";
function Section(props) {
  const [data, setData] = react.useState([]);
  const [PageNumbers, setPageNumbers] = react.useState(1);
  const [currentPageNumber, setcurrentPageNumber] = react.useState(1);
  const [isLoading, setLoading] = react.useState(true);
  const [isError, setError] = react.useState(false);
  const [HasMore, sethasMore] = react.useState(true);

  react.useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `/api/tvshows/${currentPageNumber}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setData((data) => {
          return [...data, ...res.data.results];
        });
        setPageNumbers(res.data.total_pages);
        setcurrentPageNumber(res.data.current_page);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        else {
          setError(true);
        }
      });
    setLoading(false);
    return () => cancel();
  }, [currentPageNumber]);

  const nextPage = () => {
    if (currentPageNumber === PageNumbers) {
      sethasMore(false);
      console.log("End of Data");
    } else {
      setLoading(true);
      setcurrentPageNumber(currentPageNumber + 1);
    }
  };
  return (
    <div className="section">
      <h1 className="Trending_title">{props.title}</h1>
      {isError ? (
        <p className="error-msg">Server Crashed , Please try again :( </p>
      ) : (
        <InfiniteScroll
          className="container"
          dataLength={20 * currentPageNumber}
          next={nextPage}
          hasMore={HasMore}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {isLoading ? (
            <div className="section loading">
              {" "}
              <RotateLoader color="#fff" />
            </div>
          ) : (
            data.map((item) => (
              <Card
                name={item.original_title || item.original_name}
                review={item.vote_average}
                age={item.adult ? "+18" : "-18"}
                year={item.first_air_date.substring(0, 4)}
                linkHref={`/${item.media_type}/${item.id}`}
                imageurl={"https://image.tmdb.org/t/p/w300" + item.poster_path}
              />
            ))
          )}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default Section;
