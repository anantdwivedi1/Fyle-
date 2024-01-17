let currentPage = 1;
let totalPages = 1;
let perPage = 10;

async function getRepos() {
  const reposListLeft = document.getElementById('repos-list-left');
  const reposListRight = document.getElementById('repos-list-right');
  const loader = document.getElementById('loader');
  const searchInput = document.getElementById('search').value;

  try {
    loader.style.display = 'block';

    // Mock data for repositories (replace this with actual API call)
    const mockRepos = [
      { name: 'repo1', topics: ['repo1 description goes here'] },
      { name: 'repo2', topics: ['repo2 description goes here'] },
      { name: 'repo3', topics: ['repo3 description goes here'] },
      { name: 'repo4', topics: ['repo4 description goes here'] },
      { name: 'repo5', topics: ['repo5 description goes here'] },
      { name: 'repo6', topics: ['repo6 description goes here'] },
      // Add more mock repositories as needed
    ];

    // Filter repositories based on the search input
    const filteredRepos = mockRepos.filter(repo => repo.name.toLowerCase().includes(searchInput.toLowerCase()));

    // Display repositories
    loader.style.display = 'none';
    reposListLeft.innerHTML = '';
    reposListRight.innerHTML = '';

    filteredRepos.slice((currentPage - 1) * perPage, currentPage * perPage).forEach((repo, index) => {
      const repoElement = document.createElement('div');
      repoElement.classList.add('repo-item');
      repoElement.innerHTML = `
        <h2>${repo.name}</h2>
        <p>Tech Stack: ${repo.topics.join(', ')}</p>
        <div class="tech-buttons">
          <button onclick="showTechStack('${repo.name}')">Show Tech Stack</button>
          <div id="techStackButtons-${repo.name}" style="display: none;">
            <button onclick="showTech('${repo.name}', 'HTML')">HTML</button>
            <button onclick="showTech('${repo.name}', 'CSS')">CSS</button>
            <button onclick="showTech('${repo.name}', 'JavaScript')">JavaScript</button>
            <button onclick="showTech('${repo.name}', 'SQL')">SQL</button>
          </div>
        </div>`;

      // Alternate between left and right columns
      if (index % 2 === 0) {
        reposListLeft.appendChild(repoElement);
      } else {
        reposListRight.appendChild(repoElement);
      }
    });

    // Update total pages
    totalPages = Math.ceil(filteredRepos.length / perPage);

    // Add pagination controls
    addPaginationControls();
  } catch (error) {
    console.error(error);
    loader.style.display = 'none';
    reposListLeft.innerHTML = 'Error fetching repositories.';
    reposListRight.innerHTML = '';
  }
}

function showTechStack(repoName) {
  const techStackButtons = document.getElementById(`techStackButtons-${repoName}`);
  techStackButtons.style.display = 'flex';
}

function showTech(tech) {
  alert(`Tech Used: ${tech}`);
}

function addPaginationControls() {
  const paginationControls = document.getElementById('pagination-controls');
  paginationControls.innerHTML = '';

  if (totalPages > 1) {
    paginationControls.appendChild(createPaginationButton('«', currentPage - 1, currentPage === 1));

    for (let i = 1; i <= totalPages; i++) {
      paginationControls.appendChild(createPaginationButton(i, i, i === currentPage));
    }

    paginationControls.appendChild(createPaginationButton('»', currentPage + 1, currentPage === totalPages));
  }
}

function createPaginationButton(text, page, isDisabled) {
  const li = document.createElement('li');
  li.classList.add('page-item', isDisabled ? 'disabled' : '');

  const a = document.createElement('a');
  a.classList.add('page-link');
  a.href = 'javascript:void(0)';
  a.textContent = text;
  a.onclick = () => changePage(page);

  li.appendChild(a);
  return li;
}

function changePage(newPage) {
  currentPage = Math.max(1, Math.min(newPage, totalPages));
  getRepos();
}

// Initial call to fetch repositories on page load
getRepos();
