import React from "react";
import SearchBar from "../components/SearchBar";
import TrendingSlide from "../components/TrendingSlide";
import RecommendationSection from "../components/RecommendationSection";
import MovieSection from "../views/Movie";
import TvSection from "../views/tv";
import BookmarkedSection from "../views/bookmarked";
import SearchSection from "../views/SearchResult";
import ArticleMovie from "../views/ArticleMovie";
import ArticleTv from "../views/ArticleTv";
import ErrorPage from "../views/ErrorPage";
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
