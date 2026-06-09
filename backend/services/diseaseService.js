import axios from "axios";
import Parser from "rss-parser";

export const fetchDiseaseData = async () => {
  // COVID-19 by country (disease.sh)
  const url = `https://disease.sh/v3/covid-19/countries`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchOtherDiseases = async () => {
  // HealthMap RSS feed for all outbreaks
  const parser = new Parser();
  const feed = await parser.parseURL("https://www.healthmap.org/rss/en");
  return feed.items.map(item => ({
    title: item.title,
    summary: item.contentSnippet,
    link: item.link,
    date: item.pubDate
  }));
};