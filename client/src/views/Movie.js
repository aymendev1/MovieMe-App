import react from "react";
import axios from "axios";
import Card from "../components/SectionCard";
import InfiniteScroll from "react-infinite-scroll-component";
import RotateLoader from "react-spinners/RotateLoader";

function MovieSection(props) {
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
      url: `${process.env.REACT_APP_SERVER}/api/movies/${currentPageNumber}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(async (res) => {
        await setData((data) => {
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
          getScrollParent={() => this.scrollParentRef}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {isLoading ? (
            <RotateLoader color="#fff" />
          ) : (
            data.map((item) => (
              <Card
                name={item.original_title || item.original_name}
                review={item.vote_average}
                age={item.adult ? "+18" : "-18"}
                year={item.release_date.substring(0, 4)}
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

export default MovieSection;
