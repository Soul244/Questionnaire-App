import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import {
  Card, CardTitle, FormGroup,
} from 'reactstrap';

/*
  Froala editor uses window object.
  At the first load, NEXT JS rendering pages on server side.
  So, components cant reach window object. To access window object,
  we should use Next Js's dynamic function.
*/
const FroalaEditorInput = dynamic(import('react-froala-wysiwyg'), {
  ssr: false,
});

function FormEditor(props) {
  const { title, ...rest } = props;
  return (
    <Card body className="mb-2 br" data-test="form-editor">
      <CardTitle data-test="title">{title}</CardTitle>
      <FormGroup>
        <FroalaEditorInput tag="textarea" {...rest} />
      </FormGroup>
    </Card>

  );
}

FormEditor.defaultProps = {
  title: '',
};

FormEditor.propTypes = {
  title: PropTypes.string,
};

export default FormEditor;
