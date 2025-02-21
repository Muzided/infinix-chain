'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const initialData = [
  { name: 'Pre-sale', value: 50.0, color: '#f3d284' },
  { name: 'Team', value: 10.0, color: '#e7a87a' },
  { name: 'Development', value: 15.0, color: '#b78071' },
  { name: 'Marketing', value: 10.0, color: '#825e7a' },
  { name: 'Rewards', value: 5.0, color: '#9B7EBD' },
  { name: 'Liquidity', value: 10.0, color: '#441752' }
  
];

export default function TokenDistributionChart() {
  const [series] = useState(initialData.map((item) => item.value));

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      dropShadow: {
        enabled: true,
        color: '#fff',
        top: -1,
        left: 3,
        blur: 3,
        opacity: 0.2
      },
      animations: {
        enabled: false,
      },
    },
    labels: initialData.map((item) => item.name),
    colors: initialData.map((item) => item.color),
    stroke: {
      width: 0,
      colors: ['#13131d']
    },
    plotOptions: {
      pie: {
        donut: {
          size: '50%',
          labels: {
            show: true,
            name: { show: true, color: '#ffffff', fontSize: '16px', fontWeight: 500},
            value: {
              show: true, color: '#ffffff', fontSize: '18px', fontWeight: 500,
              formatter: (val: string | number | undefined) => `${val || 0}%`,
            },
            total: {
              show: true,
              label: 'FNX',
              color: '#ffffff', fontSize: '16px', fontWeight: 500,  
              formatter: () => '10,000,000,000',
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.15,
        opacityFrom: 0.9,
        opacityTo: 0.9,
    }
    },
    
    legend: {
      fontWeight: 500,
      
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '18px',
      markers: {
        offsetX: -5
        // width: 12,
        // height: 12,
        // radius: 2,
      },
      labels: {
        colors: '#ffffff', // Array of colors for legend items or single color
        useSeriesColors: false, // Use colors from series (set to true if needed)
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
      formatter: (legendName: string, opts: any) => {
        const value =
          opts?.w?.globals?.series?.[opts.seriesIndex] || 0;
        return `${legendName} - ${value}%`;
      },
      offsetY: 7
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            horizontalAlign: 'center',
            width: 320,
          },
          legend: {
            position: 'bottom',
            orizontalAlign: 'center',
          },
        },
      },
    ],
  };

  return (
    <div className="lg:p-8 md:p-7 sm:p-5 p-2 h-full w-full flex flex-col items-center">
      <Chart options={options} series={series} type="donut" height={480} width={500}/>
    </div>
  );
}
