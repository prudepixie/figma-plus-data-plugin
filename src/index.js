/** @jsx h */
import "./figma-plugin-ui.scss";
import h from "vhtml";
import { getDomNode, createHtmlNodes } from "./utils";
import { textTransform } from "text-transform";
import { getContentTypeData } from "./service";

export default class DataGeneratorPlugin {
  constructor() {
    this.pluginName = "Data Generator Plugin";

    // SETUP PLUGIN
    const shortcut = {
      mac: {
        command: true,
        shift: true,
        key: "G"
      },
      windows: {
        alt: true,
        shift: true,
        key: "G"
      }
    };

    const options = [this.pluginName, this.showUI, null, shortcut];

    window.figmaPlus.createPluginsMenuItem(...options);
    window.figmaPlus.createKeyboardShortcut(shortcut, this.showUI);

    // The UI follows a strict structure to utlize the CSS shipped with this boilerplate
    // But you can freely play with the css in figma-plugin-ui.scss

    this.UI = (
      <div class="figma-plugin-ui">
        <div class="container">
          <p>(choose content type to replace in selected layers)</p>
          <div class="panel-container">
            <h2 id="names">Names</h2>
            <span class="icon-container">
              <span class="gc8874076" />
            </span>
            <div class="toggle-panel">
              <label for="selectGender">Gender</label>
              <div class="select">
                <select id="selectGender">
                  <option>male</option>
                  <option>female</option>
                  <option>both</option>
                </select>
              </div>
            </div>
          </div>

          <div class="type-container">
            <h2 id="usernames">Usernames</h2>
          </div>
          <h2 id="email">Email</h2>
          <h2 id="countries">Countries</h2>
          <h2 id="addresses">Addresses</h2>
        </div>
      </div>
    );
  }

  attachEvents = () => {
    ["#names"].map(id =>
      getDomNode(id).addEventListener("input", this.toggleOptionsPanel)
    );

    ["#usernames", "#email", "#countries", "#addresses"].map(id =>
      getDomNode(id).addEventListener("click", () =>
        this.getContentTypeList(id)
      )
    );

    // ["#select1", "#select2"].map(id =>
    //   getDomNode(id).addEventListener("change", this.onInteract)
    // );
  };

  showUI = () => {
    // Show the plugin modal using figmaPlugin API.
    window.figmaPlus.showUI(
      this.pluginName,
      modalElement => {
        const htmlNodes = createHtmlNodes(this.UI);
        modalElement.parentNode.replaceChild(htmlNodes, modalElement);
        this.attachEvents();
      },
      300,
      300,
      0.5,
      0.5,
      false,
      false
    );
  };

  toggleOptionsPanel = () => {};

  getContentTypeList = async id => {
    event.stopImmediatePropagation();
    const selectedNodes = Object.keys(
      window.App._state.mirror.sceneGraphSelection
    );
    if (selectedNodes.length === 0) {
      figmaPlus.showToast("⚠️ You must select at least one layer.");
      return;
    }

    await getContentTypeData(id, selectedNodes.length).then(async items => {
      let filteredItems;

      switch (id) {
        case "#names":
          filteredItems = items.map(item =>
            textTransform(`${item.name.first} ${item.name.last}`, "capitalize")
          );
          break;
        case "#email":
          filteredItems = items.map(item => item.email);
          break;
        case "#countries":
          filteredItems = items.map(
            item => `${textTransform(item.location.city, "capitalize")}`
          );
          break;
        case "#usernames":
          filteredItems = items.map(item => item.login.username);
          break;
        case "#addresses":
          filteredItems = items.map(
            item =>
              `${item.location.street}, ${item.location.city}, ${
                item.location.state
              }, ${item.location.postcode} `
          );
          break;
        default:
          break;
      }
      await this.setLayersText(selectedNodes, filteredItems);
    });
  };

  setLayersText = (selectedNodes, filteredItems) => {
    for (const [index, nodeId] of selectedNodes.entries()) {
      const node = window.figmaPlus.scene.getNodeById(nodeId);
      if (node.type === "TEXT") {
        node.characters = filteredItems[index];
      }
    }
  };
}

window.dataGeneratorPlugin = new DataGeneratorPlugin();
