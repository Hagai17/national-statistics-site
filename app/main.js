// main.js — the router and the page controls. One job: watch the hash, render
// the matching view from views.js into the page, and wire the controls each
// view declares (chart/table toggles, the province search and sort). All
// state lives in the URL hash, so every page is reachable by a link and the
// back button works.

import { overviewView, peopleView, economyView, livingView, provincesView, sourcesView } from './views.js';

const ROUTES = {
  '/': overviewView,
  '/people': peopleView,
  '/economy': economyView,
  '/living': livingView,
  '/provinces': provincesView,
  '/sources': sourcesView,
};

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('nav a')];

function currentPath() {
  const hash = location.hash.replace(/^#/, '');
  return ROUTES[hash] ? hash : '/';
}

function render() {
  const path = currentPath();
  app.innerHTML = ROUTES[path]();
  navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${path}`));
  wireControls();
  window.scrollTo(0, 0);
}

// Chart/Table toggle buttons inside each chart card.
function wireToggles() {
  app.querySelectorAll('.card .toggle').forEach((toggle) => {
    const card = toggle.closest('.card');
    const chartWrap = card.querySelector('.chart-wrap');
    const tableWrap = card.querySelector('.table-wrap');
    toggle.querySelectorAll('.toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const showTable = btn.dataset.view === 'table';
        chartWrap.hidden = showTable;
        tableWrap.hidden = !showTable;
        toggle.querySelectorAll('.toggle-btn').forEach((b) => b.classList.toggle('is-on', b === btn));
      });
    });
  });
}

// Province search + sort: filter and reorder the table rows in place.
function wireProvinceControls() {
  const input = document.getElementById('province-search');
  const select = document.getElementById('province-sort');
  const tbody = document.querySelector('#province-table tbody');
  if (!input || !select || !tbody) return;
  const allRows = [...tbody.querySelectorAll('tr')];
  const peopleOf = (tr) => Number(tr.children[2].textContent.replace(/[^0-9]/g, ''));
  function apply() {
    const q = input.value.trim().toLowerCase();
    const visible = allRows.filter((tr) => tr.dataset.name.includes(q));
    const by = {
      rank: (a, b) => peopleOf(b) - peopleOf(a),
      name: (a, b) => a.dataset.name.localeCompare(b.dataset.name),
      'people-desc': (a, b) => peopleOf(b) - peopleOf(a),
      'people-asc': (a, b) => peopleOf(a) - peopleOf(b),
    }[select.value];
    visible.sort(by).forEach((tr) => tbody.appendChild(tr));
    allRows.forEach((tr) => { tr.hidden = !visible.includes(tr); });
  }
  input.addEventListener('input', apply);
  select.addEventListener('change', apply);
}

function wireControls() {
  wireToggles();
  wireProvinceControls();
}

window.addEventListener('hashchange', render);
render();
