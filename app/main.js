// main.js — the Ledger's router and nothing else.
//
// Hash routes, one per page: #/overview, #/people, #/economy, #/provinces,
// #/living, #/sources. An unknown hash falls back to the overview. The two
// page controls (province sort, economy chart series) are handled by one
// delegated click listener, so no inline handlers are needed anywhere.

import { renderPage, setProvinceSort, setEconomySeries } from './views.js';

const pageEl = document.getElementById('page');
const navLinks = [...document.querySelectorAll('.pagenav a')];

function routeFromHash() {
  const raw = window.location.hash.replace(/^#\/?/, '').split('/')[0];
  const known = ['overview', 'people', 'economy', 'provinces', 'living', 'sources'];
  return known.includes(raw) ? raw : 'overview';
}

function render() {
  const route = routeFromHash();
  pageEl.innerHTML = renderPage(route);
  for (const link of navLinks) {
    link.classList.toggle('active', link.dataset.page === route);
  }
  document.title = `The Archipelago Ledger — ${route[0].toUpperCase()}${route.slice(1)} | Indonesia in Numbers`;
}

pageEl.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  const value = button.dataset.value;
  if (action === 'province-sort') setProvinceSort(value);
  if (action === 'economy-series') setEconomySeries(value);
  render();
});

window.addEventListener('hashchange', () => {
  render();
  window.scrollTo(0, 0);
});

render();
