import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Header from 'components/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { openSearch } from './actions';
import muiTheme from './mui-theme';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  flex: 1;
`;

export function App(props) {
  const { onOpenSearch } = props;
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Pamu"
        defaultTitle="Pamu"
        link={[
          { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&subset=vietnamese' },
          { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' },
          { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' },
        ]}
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header onOpenSearch={onOpenSearch} />
          {props.children}
        </div>
      </MuiThemeProvider>
    </AppWrapper>
  );
}

App.propTypes = {
  children: PropTypes.node,
  onOpenSearch: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onOpenSearch: () => dispatch(openSearch()),
  };
}
export default connect(null, mapDispatchToProps)(App);
