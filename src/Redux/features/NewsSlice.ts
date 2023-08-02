import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { News } from "../../types/news";

interface NewsState {
  newsData: News[];
  loading: boolean;
  error: string | null;
  selectedNews: News | null; // Added property for the selected news item
}

const initialState: NewsState = {
  newsData: [],
  loading: false,
  error: null,
  selectedNews: null, // Initialized with null, as no news is selected initially
};

const apiKey = "c6f25d8a59d04bda9b442f85c4eff9d0";
const apiUrl = `https://api.worldnewsapi.com/search-news?api-key=${apiKey}&text=tesla`;

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.news;
  } catch (error: any) {
    throw error.response.data;
  }
});

// New async thunk to fetch news by ID
export const fetchNewsById = createAsyncThunk("news/fetchNewsById", async (id: string) => {
  const newsUrl = `https://newsapi.org/v2/everything?sources=techcrunch&apiKey=${apiKey}&q=${id}`;
  try {
    const response = await axios.get(newsUrl);
    return response.data; 
  } catch (error: any) {
    throw error.response.data;
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<News[]>) => {
        state.loading = false;
        state.newsData = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news data";
      })
      // Extra reducers for fetching news by ID
      .addCase(fetchNewsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsById.fulfilled, (state, action: PayloadAction<News>) => {
        state.loading = false;
        state.selectedNews = { ...action.payload }; 
      })
      .addCase(fetchNewsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news by ID";
      });
  },
});

export default newsSlice.reducer;
