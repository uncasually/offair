import htm from "https://unpkg.com/htm?module";
import format from "https://unpkg.com/date-fns@2.7.0/esm/format/index.js?module";

const html = htm.bind(h);

// Preview component for a Record Post
const Record = createClass({
  render() {
    const entry = this.props.entry;

    return html`
      <main>
        <article>
        <figure class="record-container">
          <img class="record-img" src="${entry.getIn(["data", "image"], null)}" alt="record image" />
          <figcaption>
          <h1>${entry.getIn(["data", "title"], null)}</h1>
          
          <p>${entry.getIn(["data", "summary"], "")}</p>

          ${this.props.widgetFor("body")}
          <p>
          </p>
          <p>
            <a href="https://www.instagram.com/${entry.getIn(["data", "instagram"], null)}" rel="instagram" class="article-social ig-link"><i class="fab fa-instagram fa-2x"></i></a>
            <a href="${entry.getIn(["data", "spotify"], null)}" rel="spotify" class="article-social spotify-link"><i class="fa-solid fa-music fa-2x"></i></a>
          </p>
          <p>
            <small> 
            Released  <time>${
                  format(
                    entry.getIn(["data", "date"], new Date()),
                    "yyyy"
                  )
                }</time>
            </small>
          </p>
          </figcaption>
          </figure>
        </article>
      </main>
    `;
  }
});

export default Record;
