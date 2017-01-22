import { fromJS } from 'immutable';

import {
  LOAD_MANGAS, MANGAS_LOADED, MANGAS_LOAD_ERROR,
  LOAD_CHAPTERS, CHAPTERS_LOADED, CHAPTERS_LOAD_ERROR,
  LOAD_CHAPTER, CHAPTER_LOADED, CHAPTER_LOAD_ERROR,
} from './constants';

const initialState = fromJS({
  mangas: [],
  chapters: [],
  currentChapter: {},
  isLoadingMangas: false,
  isLoadingChapters: false,
  isLoadingChapter: false,
});

function mangaReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MANGAS:
      return state.set('isLoadingMangas', true);
    case MANGAS_LOADED:
      return state
        .set('isLoadingMangas', false)
        .set('mangas', fromJS(action.mangas));
    case MANGAS_LOAD_ERROR:
      return state;
    case LOAD_CHAPTERS:
      return state.set('isLoadingChapters', true);
    case CHAPTERS_LOADED:
      return state
        .set('isLoadingChapters', false)
        .set('chapters', fromJS(action.chapters));
    case CHAPTERS_LOAD_ERROR:
      return state;
    case LOAD_CHAPTER:
      return state.set('isLoadingChapter', true);
    case CHAPTER_LOADED:
      return state
        .set('isLoadingChapter', false)
        .set('currentChapter', fromJS(action.chapter));
    case CHAPTER_LOAD_ERROR:
      return state;
    default: return state;
  }
}

export default mangaReducer;
