import react from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TrendingCard from "./TrendingSlideCard";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

export default function App() {
  const [data, setData] = react.useState([]);
  react.useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: `/trending`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setData(res.data.trending);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        else {
          console.log(err);
        }
      });
    return () => cancel();
  });
  return (
    <div>
      <h1 className="Trending_title">Trending</h1>

      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        slidesPerGroup={3}
        loop={false}
        loopFillGroupWithBlank={true}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          1880: {
            slidesPerView: 5,
            spaceBetween: 20,
          },

          1320: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          425: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
        }}
        className="mySwiper"
      >
        {data.map((item, item_index) => (
          <SwiperSlide>
            <TrendingCard
              itemID={item.id}
              key={item_index}
              name={item.original_title || item.original_name}
              categorie={item.media_type}
              review={item.vote_average}
              year={
                item.release_date
                  ? item.release_date.substring(0, 4)
                  : item.first_air_date.substring(0, 4)
              }
              imageurl={"https://image.tmdb.org/t/p/w300" + item.poster_path}
              linkHref={`/${item.media_type}/${item.id}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
