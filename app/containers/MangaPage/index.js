import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import styled from 'styled-components';
import AutoComplete from 'material-ui/AutoComplete';
import CircularProgress from 'material-ui/CircularProgress';
import MangaList from 'components/MangaList';
import ChapterList from 'components/ChapterList';
import Reader from 'components/Reader';
import Loader from 'components/Loader';

import { makeSelectIsOpenSearch } from 'containers/App/selectors';
import * as MangaPageActions from './actions';
import { makeSelectMangas, makeSelectIsLoading, makeSelectChapters, makeSelectCurrentChapter } from './selectors';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

export class MangaPage extends Component {
  constructor(props) {
    super(props);
    this.handleScrollTop = this.handleScrollTop.bind(this);
    this.handlePrevChapter = this.handlePrevChapter.bind(this);
    this.handleNextChapter = this.handleNextChapter.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.handleChangeChapter = this.handleChangeChapter.bind(this);
    this.state = {
      search: '',
    };
  }
  componentDidMount() {
    const { loadMangas, loadChapters, loadChapter, params } = this.props;
    loadMangas();
    if (params.mangaName) {
      loadChapters(params.mangaName);
      if (params.chapterName) {
        loadChapter(params.mangaName, params.chapterName);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    const { loadChapters, loadChapter } = this.props;

    if (nextProps.params.mangaName) {
      if (!this.props.params.mangaName || this.props.params.mangaName !== nextProps.params.mangaName) {
        loadChapters(nextProps.params.mangaName);
      }
    }
    if (nextProps.params.chapterName) {
      if (this.props.params.chapterName !== nextProps.params.chapterName) {
        loadChapter(nextProps.params.mangaName, nextProps.params.chapterName);
      }
    }
  }
  handleUpdateInput(mangaTitle) {
    this.setState({
      search: mangaTitle,
    });
  }
  handleNewRequest(mangaTitle) {
    const { mangas } = this.props;
    const currentManga = mangas.find((manga) => manga.title === mangaTitle);
    if (currentManga) {
      this.setState({
        search: '',
      });
      browserHistory.push(`/manga/${currentManga.name}`);
    }
  }
  handleChangeChapter(event, index, value) {
    const { chapters, currentChapter } = this.props;
    const oldIndex = chapters.findIndex((chapter) => chapter.chapterName === currentChapter.chapterName);
    if (index !== oldIndex) {
      browserHistory.push(`/manga/${chapters[index].manga}/${chapters[index].chapterName}`);
    }
  }
  handleScrollTop() {
    window.scrollTo(0, 0);
  }
  handlePrevChapter() {
    const { chapters, currentChapter } = this.props;
    const index = chapters.findIndex((chapter) => chapter.chapterName === currentChapter.chapterName);
    if (index + 1 < chapters.length) {
      browserHistory.push(`/manga/${chapters[index + 1].manga}/${chapters[index + 1].chapterName}`);
    }
  }
  handleNextChapter() {
    const { chapters, currentChapter } = this.props;
    const index = chapters.findIndex((chapter) => chapter.chapterName === currentChapter.chapterName);
    if (index > 0) {
      browserHistory.push(`/manga/${chapters[index - 1].manga}/${chapters[index - 1].chapterName}`);
    }
  }
  render() {
    const { isLoadingMangas, isOpenSearch, params, mangas, chapters, currentChapter } = this.props;
    let content = '';
    if (params.chapterName) {
      content = Object.keys(currentChapter).length === 0 ? (
        <Loader>
          <CircularProgress size={60} thickness={7} color="#00E5FF" />
        </Loader>) : (
          <Reader
            chapters={chapters}
            currentChapter={currentChapter}
            handleScrollTop={this.handleScrollTop}
            handlePrevChapter={this.handlePrevChapter}
            handleNextChapter={this.handlePrevChapter}
            handleChangeChapter={this.handleChangeChapter}
          />
        );
    } else if (params.mangaName) {
      content = <ChapterList chapters={chapters} />;
    } else {
      content = isLoadingMangas ? (
        <Loader>
          <CircularProgress size={60} thickness={7} color="#00E5FF" />
        </Loader>
      ) : (
        <MangaList mangas={mangas} />
      );
    }
    return (
      <Page>
        <Helmet
          title="Feature Page"
          meta={[
            { name: 'description', content: 'Feature page of React.js Boilerplate application' },
          ]}
        />
        {
          isOpenSearch ? (
            <AutoComplete
              hintText="Find Manga..."
              searchText={this.state.search}
              dataSource={mangas.map((manga) => manga.title)}
              filter={AutoComplete.caseInsensitiveFilter}
              onUpdateInput={this.handleUpdateInput}
              onNewRequest={this.handleNewRequest}
              fullWidth
            />
          ) : null
        }
        { content }
      </Page>
    );
  }
}

MangaPage.propTypes = {
  loadMangas: PropTypes.func,
  loadChapters: PropTypes.func,
  loadChapter: PropTypes.func,
  params: PropTypes.object,
  mangas: PropTypes.array,
  chapters: PropTypes.array,
  currentChapter: PropTypes.object,
  isLoadingMangas: PropTypes.bool,
  isOpenSearch: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  mangas: makeSelectMangas(),
  chapters: makeSelectChapters(),
  isLoading: makeSelectIsLoading(),
  currentChapter: makeSelectCurrentChapter(),
  isOpenSearch: makeSelectIsOpenSearch(),
});

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(MangaPageActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(MangaPage);
