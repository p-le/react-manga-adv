import {
  LOAD_MANGAS, MANGAS_LOADED, MANGAS_LOAD_ERROR,
  LOAD_CHAPTERS, CHAPTERS_LOADED, CHAPTERS_LOAD_ERROR,
  LOAD_CHAPTER, CHAPTER_LOADED, CHAPTER_LOAD_ERROR,
} from './constants';

export function loadMangas() {
  return {
    type: LOAD_MANGAS,
  };
}

export function loadChapters(mangaName) {
  return {
    type: LOAD_CHAPTERS,
    mangaName,
  };
}

export function loadChapter(mangaName, chapterName) {
  return {
    type: LOAD_CHAPTER,
    mangaName,
    chapterName,
  };
}

export function mangasLoaded(mangas) {
  return {
    type: MANGAS_LOADED,
    mangas,
  };
}

export function mangasLoadError(err) {
  return {
    type: MANGAS_LOAD_ERROR,
    err,
  };
}

export function chaptersLoaded(chapters) {
  return {
    type: CHAPTERS_LOADED,
    chapters,
  };
}

export function chaptersLoadError(err) {
  return {
    type: CHAPTERS_LOAD_ERROR,
    err,
  };
}

export function chapterLoaded(chapter) {
  return {
    type: CHAPTER_LOADED,
    chapter,
  };
}

export function chapterLoadError(err) {
  return {
    type: CHAPTER_LOAD_ERROR,
    err,
  };
}
