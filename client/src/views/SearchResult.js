import react from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/SectionCard";
import { useParams } from "react-router-dom";
import RotateLoader from "react-spinners/RotateLoader";
function SearchSection() {
  let { query } = useParams();
  const [data, setData] = react.useState([]);
  const [PageNumbers, setPageNumbers] = react.useState(1);
  const [currentPageNumber, setcurrentPageNumber] = react.useState(1);
  const [totalResult, settotalResult] = react.useState(0);
  const [isLoading, setLoading] = react.useState(true);
  const [error, setError] = react.useState("");
  const [HasMore, sethasMore] = react.useState(true);
  react.useEffect(() => {
    setLoading(true);
    setError("");
    let cancel;
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_SERVER}/search/${query}/${currentPageNumber}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setData((data) => {
          return [...data, ...res.data.results];
        });
        setPageNumbers(res.data.total_pages);
        setcurrentPageNumber(res.data.current_page);
        settotalResult(res.data.total_results);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        else {
          setLoading(false);
          setError(err.message);
        }
      });

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

  return isLoading ? (
    <div className="section loading">
      <RotateLoader color="#fff" />
    </div>
  ) : error ? (
    <div className="section">
      <span>Error</span>
      <span>{error}</span>
    </div>
  ) : (
    <div className="section">
      <h1 className="Trending_title">
        Result for : {query} ( {totalResult} )
      </h1>

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
        {data.map((item) => (
          <Card
            name={item.original_title || item.original_name || item.name}
            review={item.vote_average}
            age={item.adult ? "+18" : "-18"}
            linkHref={`/${item.media_type}/${item.id}`}
            imageurl={
              (item.poster_path || item.profile_path) === (undefined || null)
                ? "/error_poster.jpg"
                : "https://image.tmdb.org/t/p/w300" +
                  (item.poster_path || item.profile_path)
            }
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default SearchSection;
