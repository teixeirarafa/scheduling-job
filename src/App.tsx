import React from 'react';

interface Job {
  ID: number;
  Description: string;
  MaxDate: string;
  time: number;
}

const App: React.FC = () => {
  const jobs = [
    {
      ID: 1,
      Description: 'Importação de arquivos de fundos',
      MaxDate: '2019-11-10 12:00:00',
      time: 2,
    },
    {
      ID: 2,
      Description: 'Importação de dados da Base Legada',
      MaxDate: '2019-11-11 12:00:00',
      time: 4,
    },
    {
      ID: 3,
      Description: 'Importação de dados de integração',
      MaxDate: '2019-11-11 8:00:00',
      time: 6,
    },
    {
      ID: 4,
      Description: 'Importação de dados da Base Legada',
      MaxDate: '2019-11-11 19:00:00',
      time: 16,
    },
  ];

  const tempoMaximo = 8;
  const inicioJanelaExecucao = new Date('2019-11-10 09:00:00');
  const fimJanelaExecucao = new Date('2019-11-11 12:00:00');

  const resposta: number[][] = [[]];
  let indiceResposta = 0;
  let contadorTempoExecucao = 0;
  let tempoExecucaoDaJanela = inicioJanelaExecucao;

  // soma as horas da janela de execução
  function adicionaHoras(date: Date, horas: number) {
    const result = new Date(date);
    result.setHours(result.getHours() + horas);
    return result;
  }

  function realizaAgendamento(job: Job) {
    contadorTempoExecucao += job.time;

    if (contadorTempoExecucao > tempoMaximo) {
      contadorTempoExecucao = job.time;
      indiceResposta += 1;
      resposta.push([job.ID]);
    } else {
      resposta[indiceResposta].push(job.ID);
    }
  }

  jobs.sort((a, b) => {
    const dateA = +new Date(a.MaxDate);
    const dateB = +new Date(b.MaxDate);
    return dateA - dateB;
  });

  jobs.map(job => {
    tempoExecucaoDaJanela = adicionaHoras(tempoExecucaoDaJanela, job.time);

    // Todos os Jobs devem ser executados dentro da janela de execução
    if (tempoExecucaoDaJanela > fimJanelaExecucao) {
      return resposta;
    }

    // Deve ser respeitada a data máxima de conclusão do Job;
    const dataMaximaJob = new Date(job.MaxDate);
    if (tempoExecucaoDaJanela > dataMaximaJob) {
      return resposta;
    }

    realizaAgendamento(job);

    return resposta;
  });

  return <h1>{JSON.stringify(resposta)}</h1>;
};

export default App;
