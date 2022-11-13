import React from "react";
import SearchBar from "./SearchBar";
import TrendingSlide from "./sections/TrendingSlide";
import RecommendationSection from "./RecommendationSection";
import MovieSection from "./pages/Movie";
import TvSection from "./pages/tv";
import BookmarkedSection from "./pages/bookmarked";
import SearchSection from "./pages/SearchResult";
import ArticleMovie from "./pages/ArticleMovie";
import ArticleTv from "./pages/ArticleTv";
import ErrorPage from "./pages/ErrorPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function home() {
  return (
    <Router>
      <div className="home_content">
        <SearchBar />
        <Switch>
          <Route exact path="/">
            <TrendingSlide />
            <RecommendationSection title="Recommended for you" />
          </Route>
          <Route path="/movies">
            <MovieSection title="Movies" />
          </Route>
          <Route path="/tvshows">
            <TvSection title="Tv Shows" />
          </Route>
          <Route path="/bookmarks">
            <BookmarkedSection title="Bookmarks" />
          </Route>
          <Route path={`/search/:query`}>
            <SearchSection />
          </Route>
          <Route path={"/movie/:id"}>
            <ArticleMovie type="movie" />
          </Route>
          <Route path={`/tv/:id`}>
            <ArticleTv type="tv" />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default home;
