import type { IConstruct } from 'constructs';
import type { Task } from 'projen';
import { Component, DependencyType } from 'projen';

export class DownloadNodeVersions extends Component {
  public readonly task: Task;
  public constructor(scope: IConstruct) {
    super(scope, 'download-node-versions');

    this.task = this.project.addTask('download-node-versions', {
      exec: 'tsx projenrc/builtin/download-node-versions.ts',
    });

    this.project.deps.addDependency('tsx', DependencyType.BUILD);
    this.project.tasks.tryFind('post-upgrade')?.spawn(this.task);
  }
}
