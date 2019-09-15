class TextField extends HTMLElement {
  styles = `
    :host {
      display: block;
      font-family: Helvetica, Arial, sans-serif;
      width: 100%;
    }

    .container {
      display: flex;
      flex-direction: column;
      font-family: inherit;
      position: relative;
    }

    .label {
      color: #222222;
      font-family: inherit;
      font-size: 1.2rem;
      margin: 0 0 5px;
    }

    .text-field {
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #eeeeee;
      color: #444444;
      font-family: inherit;
      font-size: 2rem;
      font-weight: 100;
      padding: 7px 15px 5px;
    }

    .text-field:focus {
      border-bottom: 2px solid #dddddd;
      outline: none;
      padding: 7px 15px 4px;
    }
  `;
  template = props => {
    const { id, label, value } = props;

    return `
      <div class="container">
        <label class="label" for="${id}">${label}</label>
        <input class="text-field" id="${id}" type="text" value="${value}" />
      </div>
    `;
  };
  constructor() {
    super();

    let nodes = new DOMParser().parseFromString(
      this.template({
        id: this.id,
        label: this.label,
        value: this.defaultValue
      }),
      "text/html"
    );

    const shadow = this.attachShadow({ mode: "open" }).appendChild(
      nodes.body.firstChild
    );

    this.el = shadow.querySelector(".text-field");

    let style = document.createElement("style");
    style.innerHTML = this.styles;

    shadow.appendChild(style);
  }

  get id() {
    return this.getAttribute("id");
  }

  get label() {
    return this.getAttribute("label");
  }

  get name() {
    return this.getAttribute("name");
  }

  get value() {
    return this.el.value;
  }

  set value(value) {
    this.el.value = value;
  }

  get defaultValue() {
    return this.getAttribute("defaultValue");
  }
}

customElements.define("text-field", TextField);
