import React from 'react';

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
      MaxDate: '2019-11-10 15:00:00',
      time: 6,
    },
    {
      ID: 4,
      Description: 'Importação de dados da Base Legada',
      MaxDate: '2019-11-11 19:00:00',
      time: 23,
    },
  ];
  const resposta: number[][] = [[]];
  const tempoMaximo = 8;
  const inicioJanelaExecucao = new Date('2019-11-10 09:00:00');
  const fimJanelaExecucao = new Date('2019-11-11 12:00:00');

  // function verificaDataMaximaJob() { }

  // function verificaFinalJanelaExecucao() { }

  function addDays(date: Date, horas: number) {
    const result = new Date(date);
    result.setHours(result.getHours() + horas);
    return result;
  }

  jobs.sort((a, b) => {
    const dateA = +new Date(a.MaxDate);
    const dateB = +new Date(b.MaxDate);
    return dateA - dateB;
  });

  let indiceResposta = 0;
  let contadorTempoExecucao = 0;
  let tempoExecucaoDaJanela = inicioJanelaExecucao;
  jobs.map(job => {
    // eslint-disable-next-line no-debugger
    debugger;
    tempoExecucaoDaJanela = addDays(tempoExecucaoDaJanela, job.time);
    console.log(tempoExecucaoDaJanela);
    if (tempoExecucaoDaJanela > fimJanelaExecucao) {
      return resposta;
    }

    if (tempoExecucaoDaJanela > new Date(job.MaxDate)) {
      return resposta;
    }
    contadorTempoExecucao += job.time;

    if (contadorTempoExecucao > tempoMaximo) {
      contadorTempoExecucao = job.time;
      indiceResposta += 1;
      resposta.push([job.ID]);
    } else {
      resposta[indiceResposta].push(job.ID);
    }

    return resposta;
  });

  return <h1>{JSON.stringify(resposta)}</h1>;
};

export default App;
