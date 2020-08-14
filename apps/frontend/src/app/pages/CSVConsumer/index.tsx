import React, { useState } from 'react';
import { Card, Table } from 'antd';
import CSVReader from 'react-csv-reader';

import { CSVLine } from '@mesha/interfaces';

import './styles.scss';

const { Column } = Table;

/**
 * Página consumidora de arquivos CSV, após consumidos
 * os dados são mostrados em uma tabela com paginação.
 */
const CSVConsumer: React.FC = () => {
  const [csvData, setCsvData] = useState<CSVLine[]>();
  const handleCsvUploaded = (data: Array<CSVLine>) => setCsvData(data);
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
