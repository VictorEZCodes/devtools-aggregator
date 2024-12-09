import feather from 'feather-icons';

export class ToolCard {
  constructor(title, content, action) {
    this.title = title;
    this.content = content;
    this.action = action;
  }

  render() {
    const card = document.createElement('div');
    card.className = 'tool-card bg-white dark:bg-gray-800';
    card.innerHTML = `
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">${this.title}</h3>
        <div class="flex gap-2">
          <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            ${feather.icons['move'].toSvg({ class: 'w-5 h-5 cursor-move' })}
          </button>
          <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            ${feather.icons['x'].toSvg({ class: 'w-5 h-5' })}
          </button>
        </div>
      </div>
      <div class="tool-content">${this.content}</div>
    `;

    // Add event listeners
    const closeButton = card.querySelector('button:last-child');
    closeButton.addEventListener('click', () => {
      card.remove();
    });

    if (this.action) {
      this.action(card);
    }

    return card;
  }
}