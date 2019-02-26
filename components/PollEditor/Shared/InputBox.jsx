import React from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import styled from 'styled-components';
import Icon, { remove2, cross, done } from '../../../css/icons';
import { types } from '../../../containers/toolTypes';

const CustomSelect = styled.div`
  position: relative;
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  option {
    border-radius: 60px 0 0 60px;
  }
  :after {
    content: '<>';
    font: 17px 'Consolas', monospace;
    color: #333;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    right: 6px;
    top: 14px;
    padding: 0 0 2px;
    border-bottom: 1px solid #999;
    position: absolute;
    pointer-events: none;
  }
`;

const AppendButton = styled(Button)`
  border-radius: ${props =>
    props.position === 'right'
      ? '0px 60px 60px 0 !important'
      : '60px 0 0 60px !important'};
`;

const AppendInput = styled(Input)`
  border-radius: ${props =>
    props.position === 'right'
      ? '0px 60px 60px 0 !important'
      : '60px 0 0 60px !important'};
  height: 100%;
  padding-right: 2rem;
`;

const RadioButton = styled(Button)`
  border-radius:0px!important;
  padding:0 0.5rem;
  font-size:1.4rem;
  svg{
    fill: white;
  }
`;

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  };

  onClick = (order) =>{
    this.props.handleDelete(order);
    this.toggle();
  }

  render() {
    const {
      onChangeType,
      typeValue,
      onChangeInput,
      inputValue,
      order,
      hasRadio,
      radioChange,
      checked
    } = this.props;
    const { show } = this.state;
    return (
      <InputGroup>
        <Modal isOpen={show} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Uyarı</ModalHeader>
          <ModalBody>{inputValue} {order} Silmek istediğinize emin misiniz?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={()=>this.onClick(order)}>
              Sil
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Hayır
            </Button>
          </ModalFooter>
        </Modal>
        <InputGroupAddon addonType="append">
          <CustomSelect className="select-div">
            <AppendInput
              position="left"
              type="select"
              name="select-type"
              id="select-type"
              value={typeValue}
              onChange={onChangeType}
            >
              {types.map(({ type, desc }, index) => (
                <option key={index} value={type}>
                  {desc}
                </option>
              ))}
            </AppendInput>
          </CustomSelect>
          {hasRadio && (
            <RadioButton
              onClick={() => radioChange(order)}
              color={checked?"success":"secondary"}
            >
              <Icon size="24px" icon={checked?done:cross} />
            </RadioButton>
          )}
        </InputGroupAddon>
        <Input
          type="text"
          value={inputValue}
          placeholder="..."
          onChange={onChangeInput}
        />
        <InputGroupAddon addonType="append">
          <AppendButton
            position="right"
            size="md"
            color="danger"
            onClick={this.toggle}
          >
            <Icon size="24px" icon={remove2} />
          </AppendButton>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}

export default InputBox;
