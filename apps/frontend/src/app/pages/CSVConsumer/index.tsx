import React, { useState } from 'react';
import moment from 'moment';
import { Card, Button, Modal, Table } from 'antd';
import CSVReader from 'react-csv-reader';

import { CSVLine } from '@mesha/interfaces';

import './styles.scss';

const { Column } = Table;

const CSVConsumer: React.FC = () => {
  const [csvData, setCsvData] = useState<CSVLine[]>();
  const [modalVisible, setModalVisible] = useState(false);
  const switchModal = () => setModalVisible(!modalVisible);
  const handleCsvUploaded = (data: Array<CSVLine>) => setCsvData(data);
  const showModal = () =>
    Modal.info({
      title: 'Dados do seu CSV',
      icon: false,
      content: (
        <Table dataSource={csvData}>
          <Column title="Nome" dataIndex="nome" key="nome" />
          <Column
            title="Data de Nascimento"
            dataIndex="nascimento"
            key="nascimento"
          />
          <Column
            title="Altura"
            dataIndex="altura"
            key="altura"
            render={(altura: string) => <div>{altura}cm</div>}
          />
        </Table>
      ),
    });

  const parserOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: string) =>
      header.toLowerCase().replace(/\W/g, '_'),
  };

  return (
    <Card title="Consumidor de CSV">
      <CSVReader
        cssClass="csv-input"
        inputId="file-input"
        label="Envie um arquivo CSV para visualizar-lo."
        onFileLoaded={handleCsvUploaded}
        parserOptions={parserOptions}
      />
      {csvData && (
        <Table dataSource={csvData} style={{ marginTop: 15 }}>
          <Column title="Nome" dataIndex="nome" key="nome" />
          <Column
            title="Data de Nascimento"
            dataIndex="nascimento"
            key="nascimento"
          />
          <Column
            title="Altura"
            dataIndex="altura"
            key="altura"
            render={(altura: string) => <div>{altura}cm</div>}
            sorter={(prev: CSVLine, curr: CSVLine) => prev.altura - curr.altura}
            sortDirections={['descend', 'ascend']}
          />
        </Table>
      )}
    </Card>
  );
};

export default CSVConsumer;
