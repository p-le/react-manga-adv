import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Slider from 'react-slick';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

const HotMangaList = () => {
  let settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <Card>
        <CardHeader
          title="AAAA"
          subtitle="Subtitle"
          actAsExpander={true}
          showExpandableButton={true}
        />
      </Card>
      <Card>
        <CardHeader
          title="CCCC"
          subtitle="Subtitle"
          actAsExpander={true}
          showExpandableButton={true}
        />
      </Card>
      <Card>
        <CardHeader
          title="DDDD"
          subtitle="Subtitle"
          actAsExpander={true}
          showExpandableButton={true}
        />
      </Card>
      <Card>
        <CardHeader
          title="EEEE"
          subtitle="Subtitle"
          actAsExpander={true}
          showExpandableButton={true}
        />
      </Card>
      <Card>
        <CardHeader
          title="FFFF"
          subtitle="Subtitle"
          actAsExpander={true}
          showExpandableButton={true}
        />
      </Card>
    </Slider>
  );
};

export default HotMangaList;
