import { put, call, takeLatest, take, cancel } from 'redux-saga/effects';
import request from 'utils/request';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_MANGAS, LOAD_CHAPTERS, LOAD_CHAPTER } from './constants';
import {
  mangasLoaded, mangasLoadError,
  chaptersLoaded, chaptersLoadError,
  chapterLoaded, chapterLoadError,
} from './actions';

export function* fetchMangas() {
  const apiUrl = 'http://localhost:10000/api/manga';
  try {
    const mangas = yield call(request, apiUrl);
    yield put(mangasLoaded(mangas));
  } catch (err) {
    yield put(mangasLoadError(err));
  }
}

export function* fetchChapters(action) {
  const apiUrl = `http://localhost:10000/api/manga/${action.mangaName}`;
  try {
    const chapters = yield call(request, apiUrl);
    yield put(chaptersLoaded(chapters));
  } catch (err) {
    yield put(chaptersLoadError(err));
  }
}

export function* fetchChapter(action) {
  const apiUrl = `http://localhost:10000/api/manga/${action.mangaName}/${action.chapterName}`;
  try {
    const chapter = yield call(request, apiUrl);
    yield put(chapterLoaded(chapter));
  } catch (err) {
    yield put(chapterLoadError(err));
  }
}


export function* watchFetchMangas() {
  const watcher = yield takeLatest(LOAD_MANGAS, fetchMangas);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchFetchChapters() {
  const watcher = yield takeLatest(LOAD_CHAPTERS, fetchChapters);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchFetchChapter() {
  const watcher = yield takeLatest(LOAD_CHAPTER, fetchChapter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchFetchMangas,
  watchFetchChapters,
  watchFetchChapter,
];
