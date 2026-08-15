/*
 * Main entry point for the application.
 * This file initializes the application by rendering the layout, setting up the DOM elements,
 * creating actions, initializing events, and refreshing the app state.
 **/

import "./style.css";
import { renderLayout } from "./app/layout";
import { initializeDom } from "./app/dom";
import { createActions } from "./app/actions";
import { initializeEvents } from "./app/events";
import { refreshApp } from "./app/render";

const app = document.querySelector<HTMLDivElement>("#app")!;

// Render the application's HTML structure
renderLayout(app);

// Find and store the DOM elements
initializeDom();

// Create application actions
const actions = createActions();

// Set up event listeners
initializeEvents(actions);

// Render the application
refreshApp(actions);
