import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Preview component for a Page
const Page = createClass({
  render() {
    const entry = this.props.entry;

    if (entry.getIn(["data", "title"], null) == "shows") {
      return html`
      <main>
        <h2>Upcoming</h2>

        ${this.props.widgetFor("body")}
      </main>
    `;
    } else {
      
    return html`
      <main>
        <h1>${entry.getIn(["data", "title"], null)}</h1>

        ${this.props.widgetFor("body")}
      </main>
    `;
    }
  }
});

export default Page;
