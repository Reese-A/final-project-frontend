import React from 'react';

import { Pie } from 'react-chartjs-2';

import './PieChart.css';
class PieChartComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      carb: 0,
      fat: 0,
      protein: 0
    };
  }

  componentDidMount() {}

  render() {
    const { carb, fat, protein } = this.props.consumption;

    const data = {
      labels: [`Carb ${carb}g`, `Fat ${fat}g`, `Protein ${protein}g`],
      datasets: [
        {
          data: [carb * 4, fat * 9, protein * 4],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    };

    return <Pie id="pie" data={data} width={350} height={300} />;
  }
}

export default PieChartComponent;

// import React from 'react';
// import { Pie } from 'react-chartjs-2';

// const data = {
//   labels: [
//     'Red',
//     'Green',
//     'Yellow'
//   ],
//   datasets: [{
//     data: [300, 50, 100],
//     backgroundColor: [
//       '#FF6384',
//       '#36A2EB',
//       '#FFCE56'
//     ],
//     hoverBackgroundColor: [
//       '#FF6384',
//       '#36A2EB',
//       '#FFCE56'
//     ]
//   }]
// };

// export default React.createClass({
//   displayName: 'PieExample',

//   render() {
//     return (
//       <div>
//         <h2>Pie Example</h2>
//         <Pie data={data} />
//       </div>
//     );
//   }
// });
