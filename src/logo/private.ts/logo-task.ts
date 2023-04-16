import { Project } from 'projen';

function logoTask(project: Project) {
  const task = project.tasks.tryFind('logo');
  if (!task) {
    return project.addTask('logo');
  }

  return task;
}

export function logoToPngTask(project: Project, path: string) {
  const pngPath = path.substring(0, path.length-4) + '.png';
  logoTask(project).exec(`rsvg-convert -h 1024 ${path} > ${pngPath}`);
}
