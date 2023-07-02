import * as builders from './projenrc';
import { ProjenProject, logo } from './src';

const project = new ProjenProject({
  // Repo info
  repo: 'mrgrain/projen-projects',
  name: 'mrpj',
  description: 'Opinionated projen project types.',
  author: 'Momo Kornher',
  authorAddress: 'https://moritzkornher.de',

  // Release & Automation
  release: true,
  automationAppName: 'projen-builder',

  // Marketing
  logo: logo.Logo.forProjen('images/logo.svg', {
    tapeColor: '#e9f1f1',
    outlineColor: '#1f3043',
    topColor: '#d89751',
    frontColor: '#c97d2c',
    iconTransform: 'translate(12 4.5) scale(1.75)',
    icon: ['<path fill="#2f8ced" d="M29.6964 12.33L24.7064 9.45C24.2064 9.16 23.6364 9.01001 23.0564 9.01001H8.93638C8.61871 9.01001 8.30405 9.055 8.00224 9.14335C6.00047 9.72931 4.08958 11.295 2.29636 12.33C2.01636 12.49 1.91636 12.86 2.07636 13.14L4.86637 17.97C5.02637 18.25 5.39637 18.35 5.67637 18.19L8 16.8477V29.2461C8 29.6661 8.34 29.9961 8.75 29.9961H23.2461C23.6661 29.9961 23.9961 29.6561 23.9961 29.2461V16.8555L26.2964 18.19C26.5864 18.35 26.9464 18.26 27.1064 17.97L29.8964 13.14C30.0864 12.86 29.9864 12.5 29.6964 12.33Z" />',
      '<path fill="#38587a" d="M11.4836 9.01001C11.4836 9.0523 11.4836 9.08402 11.4836 9.12631C11.4836 11.5581 13.5119 13.5352 16.0065 13.5352C18.5011 13.5352 20.5293 11.5581 20.5293 9.12631C20.5293 9.08402 20.5293 9.0523 20.5293 9.01001H11.4836Z" />',
      '<path fill="#2f8ced" d="M23.9999 16H8V19H23.9999V16Z" />',
      '<path fill="#a3cdfa" d="M12.0078 9.01001C12.0078 11.2081 13.802 12.9899 16.0001 12.9899C18.1981 12.9899 20 11.2081 20 9.01001H21.0078C21.0078 11.7603 18.7504 13.9899 16.0001 13.9899C13.2497 13.9899 10.9922 11.7603 10.9922 9.01001H12.0078Z" />'].join(''),
  }),
  wordmarkOptions: {
    text: 'Mr. PJ',
    textPosition: {
      dx: 30,
      dy: 20,
    },
    size: {
      height: 180,
      width: 500,
    },
  },
});

new builders.ConstructProjectOptionsBuilder(project);
new builders.ProjenProjectOptionsBuilder(project);
new builders.TypeScriptProjectOptionsBuilder(project);

project.synth();
