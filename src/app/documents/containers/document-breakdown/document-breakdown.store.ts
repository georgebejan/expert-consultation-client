import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DocumentBreakdownStore {
  public expandedNodes: Subject<string> = new Subject<string>();
  private nodesExpandState: { [key: string]: boolean } = {};

  public isExpanded(nodeId: string) {
    return !!this.nodesExpandState[nodeId];
  }

  public expand(nodeId: string) {
    this.nodesExpandState[nodeId] = true;
    this.expandedNodes.next(nodeId);
  }

  public collapse(nodeId: string) {
    this.nodesExpandState[nodeId] = false;
  }
}
