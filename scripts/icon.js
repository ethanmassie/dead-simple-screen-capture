import { mdiStop, mdiCamcorder, mdiGithub } from '@mdi/js'

const renderSVG = (path) => `<svg width="24" height="24" viewBox="0 0 24 24"><path d="${path}"></path></svg>`;

document.getElementById('start-capture').innerHTML = renderSVG(mdiCamcorder);
document.getElementById('stop-capture').innerHTML = renderSVG(mdiStop);
document.getElementById('github-link').innerHTML = renderSVG(mdiGithub);