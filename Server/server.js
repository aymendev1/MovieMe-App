const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");
app.use(bodyParser.urlencoded({ extended: false }));
require("dotenv").config({
  path: "./config/.env",
});
app.use(express.static(path.join("../Client/public")));

app.get("/trending", async (req, res) => {
  try {
    let url = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`;
    const infodata = await fetch(url);
    const LoadedData = await infodata.json();
    return res.status(200).json({ trending: LoadedData.results });
  } catch (e) {
    // in case of error
    res.status(400).json({ success: false, data: e });
  }
});

app.get("/recommended/:pagenumber", async (req, res) => {
  let PageNumber = req.params["pagenumber"];
  try {
    let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}&page=${PageNumber}`;
    const infodata = await fetch(url);
    const LoadedData = await infodata.json();
    return res.status(200).json({
      status: "success",
      results: LoadedData.results,
      total_pages: LoadedData.total_pages,
      current_page: LoadedData.page,
    });
  } catch (e) {
    // in case of error
    res.status(400).json({ success: false, data: e });
  }
});
app.get("/api/movies/:pagenumber", async (req, res) => {
  let pagenumber = req.params["pagenumber"];
  try {
    let url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}&page=${pagenumber}`;
    const infodata = await fetch(url);
    const LoadedData = await infodata.json();
    return res.status(200).json({
      status: "success",
      results: LoadedData.results,
      total_pages: LoadedData.total_pages,
      current_page: LoadedData.page,
    });
  } catch (e) {
    // in case of error
    res.status(400).json({ success: false, data: e });
  }
});
app.get("/api/tvshows/:pagenumber", async (req, res) => {
  let pagenumber = req.params["pagenumber"];
  try {
    let url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.API_KEY}&page=${pagenumber}`;
    const infodata = await fetch(url);
    const LoadedData = await infodata.json();
    return res.status(200).json({
      status: "success",
      results: LoadedData.results,
      total_pages: LoadedData.total_pages,
      current_page: LoadedData.page,
    });
  } catch (e) {
    // in case of error
    res.status(400).json({ success: false, data: e });
  }
});
app.get("/api/tv/:id", async (req, res) => {
  let id = req.params["id"]; // { Tv-ID }
  try {
    let url = `https://api.themoviedb.org/3/tv/${id}}?api_key=${process.env.API_KEY}&append_to_response=videos`;
    const infodata = await fetch(url);
    const LoadedData = await infodata.json();

    return res.status(200).json({ content: LoadedData });
  } catch (e) {
    // in case of error
    res.status(400).json({ success: false, data: e });
  }
});
app.get("/api/movie/:id", async (req, res) => {
  let id = req.params["id"]; // { movieID }
  try {
    let url = `https://api.themoviedb.org/3/movie/${id}}?api_key=${process.env.API_KEY}&append_to_response=videos`;
    const infodata = await fetch(url);
    const LoadedData = await infodata.json();

    return res.status(200).json({ content: LoadedData });
  } catch (e) {
    // in case of error
    res.status(400).json({ success: false, data: e });
  }
});

app.get(`/search/:query/:pagenumber`, async (req, res) => {
  let query = req.params["query"];
  let pagenumber = req.params["pagenumber"];
  try {
    let url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&language=en-US&page=${pagenumber}&include_adult=false&query=${query}`;
    const infodata = await fetch(url);
    const LoadedData = await infodata.json();
    return res.status(200).json({
      status: "success",
      results: LoadedData.results,
      total_pages: LoadedData.total_pages,
      current_page: LoadedData.page,
      total_results: LoadedData.total_results,
    });
  } catch (e) {
    res.status(400).json({ sucess: false, data: e });
  }
});
app.post("/post", (req, res) => {
  let QuerySearch = req.body.querySearch;
  res.redirect(`/search/${QuerySearch}`);
});
app.listen(4000, () => {
  console.log("Server listenning ");
});
