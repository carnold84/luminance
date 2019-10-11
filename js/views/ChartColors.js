export default class ChartColors {
  barColor = '#2280c6';
  barPicker;
  bgColor = '#ffffff';
  bgPicker;
  chart;
  el;
  elChart;
  elChartContainer;
  lineColor = '#a4c21a';
  linePicker;
  pickerOptions;

  constructor({ pickerOptions }) {
    console.log('ChartColors');

    this.pickerOptions = pickerOptions;

    this.el = document.querySelector('#chart-colors');

    this.elChart = this.el.querySelector('#chart');
    this.elChartContainer = this.el.querySelector('#chart-container');

    const ctx = this.elChart.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Value 1',
          'Value 2',
          'Value 3',
          'Value 4',
          'Value 5',
          'Value 6',
        ],
        datasets: [
          {
            backgroundColor: 'transparent',
            borderColor: this.lineColor,
            data: [12, 19, 3, 5, 2, 3],
            label: '# of Votes',
            type: 'line',
          },
          {
            label: '# of Votes',
            data: [13, 22, 16, 8, 21, 9],
            backgroundColor: this.barColor,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    this.barPicker = Pickr.create({
      appClass: 'lum-picker',
      default: this.barColor,
      el: '.bar-picker',
      ...this.pickerOptions,
    });
    this.barPicker.on('change', this.onBarColorSelect);

    this.linePicker = Pickr.create({
      appClass: 'lum-picker',
      default: this.lineColor,
      el: '.line-picker',
      ...this.pickerOptions,
    });
    this.linePicker.on('change', this.onLineColorSelect);

    this.bgPicker = Pickr.create({
      appClass: 'lum-picker',
      default: this.bgColor,
      el: '.bg-picker',
      ...this.pickerOptions,
    });
    this.bgPicker.on('change', this.onBgColorSelect);
  }

  onBarColorSelect = instance => {
    this.barPicker.applyColor();
    this.barColor = instance.toHEXA().toString();

    this.update();
  };

  onLineColorSelect = instance => {
    this.linePicker.applyColor();
    this.lineColor = instance.toHEXA().toString();

    this.update();
  };

  onBgColorSelect = instance => {
    this.bgPicker.applyColor();
    this.bgColor = instance.toHEXA().toString();

    this.update();
  };

  update = () => {
    console.log(this.barColor, this.lineColor);

    this.chart.data.datasets[0].borderColor = this.lineColor;
    this.chart.data.datasets[1].backgroundColor = this.barColor;
    this.elChartContainer.style.backgroundColor = this.bgColor;

    this.chart.update();
  };

  show = () => {
    this.el.classList.remove('hide');
    this.el.classList.add('show');
  };

  hide = () => {
    this.el.classList.remove('show');
    this.el.classList.add('hide');
  };
}
