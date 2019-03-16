import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
  Table,
  Card,
} from 'reactstrap';
import styled from 'styled-components';
import Actions from './Actions';

const TableStyled = styled(Table)` 
  background-color: #fff;
`;

function TableList({ polls, deletePoll }) {
  return (
    <>
      <Card>
        <TableStyled hover responsive>
          <thead>
            <tr>
              <th>Anket Başlığı</th>
              <th>Anket Adresi</th>
              <th>Tarih</th>
              <th>Aksiyon</th>
            </tr>
          </thead>
          <tbody>
            {polls && polls.length > 0 && (
              polls.map(item => (
                <tr key={item._id}>
                  <td dangerouslySetInnerHTML={{ __html: item.name }} />
                  <td>{item.slug}</td>
                  <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                  <td>
                    <Actions _id={item._id} slug={item.slug} deletePoll={deletePoll} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </TableStyled>
      </Card>
    </>
  );
}

TableList.propTypes = {
  deletePoll: PropTypes.func.isRequired,
  polls: PropTypes.array.isRequired,
};

export default TableList;
