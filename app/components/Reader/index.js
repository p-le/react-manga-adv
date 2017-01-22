import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const Reader = ({ currentChapter, chapters, handleScrollTop, handleNextChapter, handlePrevChapter, handleChangeChapter }) => (
  <div style={{ width: '100%' }}>
    <SelectField maxHeight={300} value={chapters.findIndex((chapter) => chapter.chapterName === currentChapter.chapterName)} onChange={handleChangeChapter} style={{ width: '100%' }}>
      {
        chapters.map((chapter, index) => <MenuItem value={index} key={chapter._id} primaryText={chapter.title} />)
      }
    </SelectField>
    {
      currentChapter.imgs.map((img, index) => (
        <div key={index} >
          <img src={img} alt={`${currentChapter.title}-${index + 1}`} style={{ width: '100%', margin: '2rem 0' }} />
          <Divider />
        </div>
      ))
    }
    <FloatingActionButton
      mini style={{ position: 'fixed', bottom: 100, right: 10 }}
      onClick={handleScrollTop}
    >
      <NavigationArrowUpward />
    </FloatingActionButton>
    <FloatingActionButton
      mini style={{ position: 'fixed', bottom: 55, right: 10 }}
      disabled={chapters.findIndex((chapter) => chapter.chapterName === currentChapter.chapterName) + 1 === chapters.length}
      onClick={handlePrevChapter}
    >
      <NavigationArrowBack />
    </FloatingActionButton>
    <FloatingActionButton
      mini style={{ position: 'fixed', bottom: 10, right: 10 }}
      disabled={chapters.findIndex((chapter) => chapter.chapterName === currentChapter.chapterName) === 0}
      onClick={handleNextChapter}
    >
      <NavigationArrowForward />
    </FloatingActionButton>
  </div>
);

Reader.propTypes = {
  chapters: PropTypes.array,
  currentChapter: PropTypes.object,
  handleScrollTop: PropTypes.func,
  handleNextChapter: PropTypes.func,
  handlePrevChapter: PropTypes.func,
  handleChangeChapter: PropTypes.func,
};

export default Reader;
