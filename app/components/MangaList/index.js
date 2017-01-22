import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { List, ListItem } from 'material-ui/List';

const MangaList = ({ mangas }) => (
  <div>
    <List>
      {
      mangas.map((manga, index) => (
        <div key={index}>
          <ListItem
            primaryText={manga.title}
            containerElement={<Link to={`/manga/${manga.name}`}>{}</Link>}
          />
        </div>
      ))
      }
    </List>
  </div>
);

MangaList.propTypes = {
  mangas: PropTypes.array,
};

export default MangaList;
