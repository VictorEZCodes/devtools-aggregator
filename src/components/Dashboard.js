import { ToolCard } from './ToolCard';

export class Dashboard {
  constructor() {
    this.tools = new Map();
    this.container = document.createElement('div');
    this.container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4';
  }

  addTool(id, title, content, callback) {
    const tool = new ToolCard(title, content, callback);
    const renderedTool = tool.render();
    this.tools.set(id, renderedTool);
    this.container.appendChild(renderedTool);
  }

  render() {
    return this.container;
  }
}