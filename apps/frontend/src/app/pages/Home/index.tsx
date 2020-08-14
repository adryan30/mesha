import React from 'react';
import { Card } from 'antd';

/**
 * Página inicial, objetivo de informar o usuário sobre as operações disponíveis
 */
const Home: React.FC = () => {
  return (
    <div>
      <Card title="Bem vindo ao app PacientePlus">
        <p>Aqui você poderá:</p>
        <ul>
          <li>Cadastrar seus pacientes</li>
          <li>Gerenciar seus atendimentos e procedimentos</li>
          <li>Imprimir relatórios para seus pacientes</li>
        </ul>
        <p>Bom atendimento!</p>
      </Card>
    </div>
  );
};

export default Home;
