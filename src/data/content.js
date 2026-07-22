/**
 * content.js — All personal content for each interactive object.
 * Edit this file to update what shows up in the info panels.
 */

export const CONTENT = {

  painting: {
    tag: 'About',
    title: 'Hey, I\'m Abhijit',
    body: `
      <p>
        I'm a software engineer who loves building things that live at the intersection
        of great engineering and thoughtful design. I care deeply about the craft —
        whether that's a clean API, a smooth UI, or a system that just works.
      </p>
      <p>
        Currently exploring the edges of what's possible with web tech, 3D on the web,
        and whatever interesting problem lands in front of me.
      </p>
      <p>
        When I'm not coding, I'm probably reading, listening to music at an unreasonable
        volume, or thinking about how to make something better.
      </p>
    `,
  },

  monitor: {
    tag: 'Projects',
    title: 'Things I\'ve Built',
    body: `
      <div class="project-card">
        <h3>Project Alpha</h3>
        <p>A short description of this project — what it does, what makes it interesting, and the tech behind it.</p>
        <a href="https://github.com/abhijitparida" target="_blank" rel="noopener">View on GitHub →</a>
      </div>
      <div class="project-card">
        <h3>Project Beta</h3>
        <p>Another project description. Could be an app, a library, a tool — whatever you've built that you're proud of.</p>
        <a href="https://github.com/abhijitparida" target="_blank" rel="noopener">View on GitHub →</a>
      </div>
      <div class="project-card">
        <h3>Project Gamma</h3>
        <p>Third project. Feel free to add as many as you want — the panel scrolls.</p>
        <a href="https://github.com/abhijitparida" target="_blank" rel="noopener">View on GitHub →</a>
      </div>
    `,
  },

  bookshelf: {
    tag: 'Skills',
    title: 'The Stack',
    body: `
      <p>Things I work with regularly and know well:</p>
      <div class="skills-grid">
        <span class="skill-tag">JavaScript</span>
        <span class="skill-tag">TypeScript</span>
        <span class="skill-tag">React</span>
        <span class="skill-tag">Node.js</span>
        <span class="skill-tag">Three.js</span>
        <span class="skill-tag">Python</span>
        <span class="skill-tag">SQL</span>
        <span class="skill-tag">Git</span>
        <span class="skill-tag">Docker</span>
        <span class="skill-tag">CSS</span>
        <span class="skill-tag">WebGL</span>
        <span class="skill-tag">REST APIs</span>
      </div>
      <p style="margin-top: 20px;">Always learning something new. Currently into: <strong style="color: #e8a455;">3D on the web</strong>, <strong style="color: #e8a455;">systems design</strong>, and <strong style="color: #e8a455;">whatever I haven't figured out yet.</strong></p>
    `,
  },

  notebook: {
    tag: 'Interests',
    title: 'What I\'m Into',
    body: `
      <p>
        Outside of work, here's what actually takes up my headspace:
      </p>
      <p>
        <strong style="color: #f5ede0;">Music</strong> — deep listener, always looking for something new.
        My taste is all over the place and I'm not sorry about it.
      </p>
      <p>
        <strong style="color: #f5ede0;">Reading</strong> — fiction, non-fiction, technical writing, long blog posts at 2am.
        Currently reading: <em style="color: #e8a455;">something good, probably</em>.
      </p>
      <p>
        <strong style="color: #f5ede0;">Design</strong> — I think carefully about how things look and feel.
        Not a designer by title but definitely by instinct.
      </p>
      <p>
        <strong style="color: #f5ede0;">The internet</strong> — old weird corners of it, indie web stuff,
        things built by one person for the love of building.
      </p>
    `,
  },

  photoframe: {
    tag: 'Now',
    title: 'What I\'m Up To',
    body: `
      <p>
        This is a snapshot of what's going on in my life right now —
        updated whenever something changes.
      </p>
      <p>
        Working on personal projects, exploring new ideas, and generally
        trying to build things worth building.
      </p>
      <p>
        <em style="color: #d4c4a8;">Last updated: 2026</em>
      </p>
    `,
  },

  door: {
    tag: 'Contact',
    title: 'Let\'s Talk',
    body: `
      <p>I'm always open to interesting conversations, collaborations, or just a good chat.</p>
      <div class="social-links">
        <a class="social-link" href="mailto:hello@abhijitparida.me">
          <span class="social-icon">✉</span>
          <span>hello@abhijitparida.me</span>
        </a>
        <a class="social-link" href="https://github.com/abhijitparida" target="_blank" rel="noopener">
          <span class="social-icon">⌥</span>
          <span>github.com/abhijitparida</span>
        </a>
        <a class="social-link" href="https://twitter.com/abhijitparida" target="_blank" rel="noopener">
          <span class="social-icon">𝕏</span>
          <span>@abhijitparida</span>
        </a>
        <a class="social-link" href="https://linkedin.com/in/abhijitparida" target="_blank" rel="noopener">
          <span class="social-icon">in</span>
          <span>linkedin.com/in/abhijitparida</span>
        </a>
      </div>
    `,
  },

};
