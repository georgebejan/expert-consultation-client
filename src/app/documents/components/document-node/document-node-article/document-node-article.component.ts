import { Component, Input, OnInit } from '@angular/core';
import { DocumentNode } from '@app/core';
import { DocumentBreakdownStore } from '@app/documents/containers/document-breakdown/document-breakdown.store';

@Component({
  selector: 'app-document-node-article',
  templateUrl: './document-node-article.component.html',
  styleUrls: ['./document-node-article.component.scss']
})
export class DocumentNodeArticleComponent implements OnInit {
  @Input() article: DocumentNode;

  public isCollapsed = true;

  constructor(private documentBreakdownStore: DocumentBreakdownStore) {
  }

  ngOnInit() {
    this.isCollapsed = this.documentBreakdownStore.isCollapsed(this.article.id);
  }

  expandComments() {
    this.documentBreakdownStore.expand(this.article.id);
    this.isCollapsed = this.documentBreakdownStore.isCollapsed(this.article.id);
  }

  collapseComments() {
    this.documentBreakdownStore.collapse(this.article.id);
    this.isCollapsed = this.documentBreakdownStore.isCollapsed(this.article.id);
    this.scrollToArticle();
  }

  private scrollToArticle() {
    const el = document.getElementById(this.article.id);
    el.scrollIntoView({behavior: 'smooth'});
  }
}
