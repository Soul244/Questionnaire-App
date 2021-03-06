import React from 'react';
import PropTypes from 'prop-types';

const Gif = ({ content }) => (
  content && (<img src={content} alt="gif" className="img-fluid" data-test="gif-self" />)
);

Gif.propTypes = { content: PropTypes.string.isRequired };

export default Gif;
