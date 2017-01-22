import { createSelector } from 'reselect';

const selectManga = (state) => state.get('manga');

const makeSelectMangas = () => createSelector(
  selectManga,
  (mangaState) => mangaState.get('mangas').toJS()
);

const makeSelectIsLoading = () => createSelector(
  selectManga,
  (mangaState) => mangaState.get('isLoading')
);

const makeSelectChapters = () => createSelector(
  selectManga,
  (mangaState) => mangaState.get('chapters').toJS(),
);

const makeSelectCurrentChapter = () => createSelector(
  selectManga,
  (mangaState) => mangaState.get('currentChapter').toJS(),
);

export {
  makeSelectMangas,
  makeSelectIsLoading,
  makeSelectChapters,
  makeSelectCurrentChapter,
};
