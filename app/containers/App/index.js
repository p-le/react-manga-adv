/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from 'components/Header';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export function App(props) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
        link={[
          { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&amp;subset=vietnamese' },
        ]}
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      <MuiThemeProvider>
        <div>
          <Header />
          {props.children}
          <Footer />
        </div>
      </MuiThemeProvider>
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
