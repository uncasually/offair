import htm from "https://unpkg.com/htm?module";
import format from "https://unpkg.com/date-fns@2.7.0/esm/format/index.js?module";

const html = htm.bind(h);

// Preview component for a Post
const Post = createClass({
  render() {
    const entry = this.props.entry;

    return html`
      <main>
        <article>
          <h1 class="article-title">${entry.getIn(["data", "title"], null)}</h1>
          <p class="article-location">${entry.getIn(["data", "location"], null)}</p>
          <p class="article-date">
            <small>
              <time>${
                  format(
                    entry.getIn(["data", "date"], new Date()),
                    "dd MMM, yyyy"
                  )
                }</time>
            </small>
          </p>

          <p>${entry.getIn(["data", "summary"], "")}</p>

          ${this.props.widgetFor("body")}
          <p>
            <a href="https://www.instagram.com/${entry.getIn(["data", "instagram"], null)}" rel="instagram" class="article-social ig-link"><i class="fab fa-instagram fa-2x"></i></a>
            <a href="${entry.getIn(["data", "spotify"], null)}" rel="spotify" class="article-social spotify-link"><i class="fab fa-spotify fa-2x"></i></a>
          </p>
          <p>
            ${
              entry.getIn(["data", "tags"], []).map(
                tag =>
                  html`
                    <a href="#" rel="tag">${tag}</a>
                  `
              )
            }
          </p>
        </article>
      </main>
    `;
  }
});

export default Post;
