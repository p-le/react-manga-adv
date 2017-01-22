import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { List, ListItem } from 'material-ui/List';

const ChapterList = ({ chapters }) => (
  <div>
    <List>
      {
      chapters.map((chapter, index) => (
        <div key={index}>
          <ListItem
            primaryText={chapter.title}
            containerElement={<Link to={`/manga/${chapter.manga}/${chapter.chapterName}/`}>{}</Link>}
          />
        </div>
      ))
      }
    </List>
  </div>
);

ChapterList.propTypes = {
  chapters: PropTypes.array,
};

export default ChapterList;
